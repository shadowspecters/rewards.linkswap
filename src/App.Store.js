import Web3 from 'web3';
import { find } from 'lodash';
import { Notification } from '@components';
import Store from '@util/store';
import { LinkSwapLPToken, ERC20, StakingRewards } from '@util/contracts';
import { Networks } from '@app/App.Config';

const ethereum = window.ethereum;
if (ethereum) {
  ethereum.autoRefreshOnNetworkChange = false;
}
const web3 = new Web3(ethereum);

export const AcountStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR',
};

const initialState = {
  network: {},
  account: {
    status: AcountStatus.DISCONNECTED,
    address: null,
    balance: {},
  },
  pool: {},
  //tokenPrice: 0
};

const hydration = {
  // fetch network || not available? error
  network: async ({ state, set, hydrate }) => {
    const chainId = ethereum && (await web3.eth.getChainId());
    const network = Networks[chainId];

    // no network or unavailable
    if (!network || network?.enabled !== true) {
      set('network', null);
    }

    // network found
    else {
      set('network', { id: chainId, ...network });
    }
  },

  // hydrate all pools
  pools: async ({ state, hydrate }) => {
    const pools = state.network?.params?.pools || [];
    pools.forEach((pool) => hydrate('pool.details', pool.address));
  },

  positions: async ({ state, hydrate }) => {
    Object.values(state?.pool || {}).forEach((pool) =>
      hydrate('pool.userPosition', pool.address)
    );
  },

  pool: {
    // hydrate pool details
    details: async ({ state, update, hydrate }, poolAddress) => {
      // fetch pool by address
      const pool = find(state.network?.params?.pools, { address: poolAddress });

      const fields = {
        ...pool,
        reward: {
          yfl: {},
          ert: {},
        },
        periodFinish: null,
        contracts: {},
        hydrateValues: () => hydrate('pool.values', poolAddress),
        hydrateUserPosition: () => hydrate('pool.userPosition', poolAddress),
      };

      // contracts
      fields.contracts.pool = new web3.eth.Contract(
        LinkSwapLPToken,
        poolAddress
      );
      fields.contracts.stakingRewards = new web3.eth.Contract(
        StakingRewards,
        pool.rewardsAddress
      );

      if (pool.oldRewardsAddress) {
        fields.contracts.oldStakingRewards = new web3.eth.Contract(
          StakingRewards,
          pool.oldRewardsAddress
        );
      }

      fields.periodFinish = await fields.contracts.stakingRewards.methods
        .periodFinish()
        .call();
      fields.totalSupply = await fields.contracts.stakingRewards.methods
        .totalSupply()
        .call();

      // token addresses
      fields.token0.address = await fields.contracts.pool.methods
        .token0()
        .call();
      fields.token1.address = await fields.contracts.pool.methods
        .token1()
        .call();

      // token contracts
      fields.token0.contract = new web3.eth.Contract(
        ERC20,
        fields.token0.address
      );
      fields.token1.contract = new web3.eth.Contract(
        ERC20,
        fields.token1.address
      );

      // token symbols
      fields.token0.symbol = await fields.token0.contract.methods
        .symbol()
        .call();
      fields.token1.symbol = await fields.token1.contract.methods
        .symbol()
        .call();

      // token names
      fields.token0.name = await fields.token0.contract.methods.name().call();
      fields.token1.name = await fields.token1.contract.methods.name().call();

      // YFL rewards
      fields.reward.yfl.address = await fields.contracts.stakingRewards.methods
        .rewardTokens(0)
        .call();
      fields.reward.yfl.rate = await fields.contracts.stakingRewards.methods
        .rewardRate(0)
        .call();

      // check for ERT rewards
      try {
        const ert_address = await fields.contracts.stakingRewards.methods
          .rewardTokens(1)
          .call();
        const ert_rate = await fields.contracts.stakingRewards.methods
          .rewardRate(1)
          .call();
        const ertContract = new web3.eth.Contract(ERC20, ert_address);
        const symbol = await ertContract.methods.symbol().call();

        if (ert_address !== '0x0000000000000000000000000000000000000000') {
          fields.reward.ert = {
            address: ert_address,
            rate: ert_rate,
            symbol: symbol,
          };
        }
      } catch (e) {}

      update(`pool.${poolAddress}`, fields, () =>
        hydrate('pool.values', poolAddress)
      );
    },

    // hydrate pool values
    values: async ({ state, update, hydrate }, poolAddress) => {
      const { address, contracts, token0, token1 } = state?.pool[poolAddress];

      const PoolContract = contracts?.pool;
      const StakingRewardsContract = contracts?.stakingRewards;

      if (!StakingRewardsContract || !PoolContract) return;

      const fields = {
        totalSupply: 0,
        staked: 0,
        token0: token0,
        token1: token1,
      };

      fields.totalSupply = await PoolContract.methods.totalSupply().call();
      fields.staked = await StakingRewardsContract.methods.totalSupply().call();

      const token0Contract = new web3.eth.Contract(
        ERC20,
        fields.token0.address
      );
      const token1Contract = new web3.eth.Contract(
        ERC20,
        fields.token1.address
      );

      // hydrate token balances
      fields.token0.balance = await token0Contract.methods
        .balanceOf(address)
        .call();
      fields.token1.balance = await token1Contract.methods
        .balanceOf(address)
        .call();

      update(`pool.${poolAddress}`, fields, () =>
        hydrate('pool.userPosition', poolAddress)
      );
    },

    // hydrate pool user position
    userPosition: async ({ state, update }, poolAddress) => {
      const { reward, contracts } = state?.pool[poolAddress];

      const position = {
        balance: 0,
        oldStaked: 0,
        staked: 0,
        reward: {},
      };

      const StakingRewardsContract = contracts?.stakingRewards;
      const oldStakingRewardsContract = contracts?.oldStakingRewards;
      const PoolContract = contracts?.pool;
      const accountAddress = state.account?.address;

      if (!StakingRewardsContract || !PoolContract || !accountAddress) return;

      if (oldStakingRewardsContract) {
        position.oldStaked = await oldStakingRewardsContract.methods
          .balanceOf(accountAddress)
          .call();
      }
      position.balance = await PoolContract.methods
        .balanceOf(accountAddress)
        .call();
      position.staked = await StakingRewardsContract.methods
        .balanceOf(accountAddress)
        .call();
      position.reward.yfl = await StakingRewardsContract.methods
        .earned(accountAddress, 0)
        .call();

      try {
        if (reward.ert) {
          const ert_rewards = await StakingRewardsContract.methods
            .earned(accountAddress, 1)
            .call();
          position.reward.ert = ert_rewards;
        }
      } catch (e) {}

      update(`pool.${poolAddress}.userPosition`, position);
    },
  },
};

const triggers = {
  account: {
    connect: async ({ state, set, trigger }) => {
      if (!web3 || state.network?.enabled !== true) {
        set('account.status', AcountStatus.ERROR);
        Notification.error('No web3!');
        return;
      }

      set('status', AcountStatus.CONNECTING);

      ethereum
        .enable()
        .then((accounts) => {
          set('account.address', accounts[0]);
          set('account.status', AcountStatus.CONNECTED);
        })
        .catch((error) => {
          set('account.status', AcountStatus.ERROR);
          //Notification.error('TODO: handle ethereum.enable error', error.message)
        });
    },
    disconnect: ({ state, set }) => {
      set('account.status', AcountStatus.DISCONNECTED);
      set('account.address', null);
      set('account.balance', {});
    },
    change: async ({ set, trigger }) => {
      await set('account.status', AcountStatus.DISCONNECTED);
      await set('account.address', null);
      await set('account.balance', {});
      trigger('account.connect');
    },
    fetchEthBalance: ({ state, set }) => {
      web3.eth
        .getBalance(state.account?.address)
        .then((wei) =>
          set(
            'account.balance.eth',
            parseFloat(web3.utils.fromWei(wei)).toFixed(2)
          )
        );
    },
    fetchTokenBalance: async ({ state, set }, address) => {
      const contract = new web3.eth.Contract(LinkSwapLPToken, address);
      contract.methods
        .balanceOf(state.account?.address)
        .call()
        .then((wei) => {
          set(
            `account.balance.${address}`,
            parseFloat(web3.utils.fromWei(wei)).toFixed(2)
          );
        })
        .catch((e) => console.log(e));
    },
  },
};

const subscribers = {
  'account.status': (status, { state, trigger, hydrate }) => {
    switch (status) {
      case AcountStatus.CONNECTED:
        trigger('account.fetchEthBalance');
        trigger(
          'account.fetchTokenBalance',
          state.network?.params?.tokenAddress
        );
        hydrate('positions');
        break;
      case AcountStatus.DISCONNECTED:
        // clear everything
        break;
      default:
        // ...
        break;
    }
  },
};

const init = ({ hydrate, trigger }) => {
  hydrate('network', null, ({ state, set }) => {
    window.ethereum &&
      window.ethereum.on('chainChanged', () => hydrate('network'));
    window.ethereum &&
      window.ethereum.on('accountsChanged', () => trigger('account.change'));
    hydrate('pools');
  });
};

export default () =>
  Store('appstore', {
    initialState: initialState,
    hydration: hydration,
    triggers: triggers,
    subscribers: subscribers,
    init: init,
  });
