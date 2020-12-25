// network config default values
const networkBaseConfig = {
  name: 'Mainnet',
  enabled: true,
  preview_url: 'https://etherscan.io',
};

// available networks
// https://chainid.network/chains.json
export const Networks = {
  1: {
    ...networkBaseConfig,
    name: 'Mainnet',
    enabled: true,
    preview_url: 'https://etherscan.io',
    params: {
      tokenAddress: '0x28cb7e841ee97947a86B06fA4090C8451f64c0be',
      pools: [
        {
          token0: {
            currencyKey: 'yfl',
          },
          token1: {
            currencyKey: 'weth',
          },
          address: '0x7e5A536F3d79791E283940ec379CEE10C9C40e86',
          rewardsAddress: '0x72368fB97dab2B94A5664EbeEbF504EF482fF149',
          liqudityUrl:
            'https://linkswap.app/#/add/ETH/0x28cb7e841ee97947a86B06fA4090C8451f64c0be',
        },
        {
          token0: {
            currencyKey: 'yfl',
          },
          token1: {
            currencyKey: 'link',
          },
          address: '0x189A730921550314934019d184EC05726881D481',
          rewardsAddress: '0x35FC734948B36370c15387342F048aC87210bC22',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x28cb7e841ee97947a86B06fA4090C8451f64c0be',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'cel',
          },
          address: '0x639916bB4B29859FADF7A272185a3212157F8CE1',
          rewardsAddress: '0xfa9712cCc86c6BD52187125dCA4c2B9C7bAa3Ef8',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'usdc',
          },
          address: '0x9d996bDD1F65C835EE92Cd0b94E15d886EF14D63',
          rewardsAddress: '0x0D03Cff17367478c3349a579e50259D8A793BBc8',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'usdt',
          },
          address: '0xf36c9fc3c2aBE4132019444AfF914Fc8DC9785a9',
          rewardsAddress: '0x603065B7e2F69c897F154Ca429a2B96Cf4703f56',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xdAC17F958D2ee523a2206206994597C13D831ec7',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'yax',
          },
          address: '0x626B88542495d2e341d285969F8678B99cd91DA7',
          rewardsAddress: '0xf4C17025B623665AAcAb958FC0fa454b1265A219',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xb1dC9124c395c1e97773ab855d66E879f053A289',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'gswap',
          },
          address: '0xdef0CEF53E0D4c6A5E568c53EdCf45CeB33DBE46',
          rewardsAddress: '0x4e33D27CBCCe9Fe1c4a21A0f7C8b31C9CF5c0B75',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xaac41EC512808d64625576EDdd580e7Ea40ef8B2',
        },
        {
          token0: {
            currencyKey: 'masq',
          },
          token1: {
            currencyKey: 'weth',
          },
          address: '0x37CeE65899dA4B1738412814155540C98DFd752C',
          rewardsAddress: '0x790aDfE75706cf70191b2bD729048e42d8Ed9f60',
          liqudityUrl:
            'https://linkswap.app/#/add/ETH/0x06F3C323f0238c72BF35011071f2b5B7F43A054c',
        },
        {
          token0: {
            currencyKey: 'dpi',
          },
          token1: {
            currencyKey: 'link',
          },
          address: '0xFe04c284a9725c141CF6de85D7E8452af1B48ab7',
          rewardsAddress: '0x017FAD4b7a54C1ACe95Ca614954e4D0d12CDb27E',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b',
        },
        {
          token0: {
            currencyKey: 'busd',
          },
          token1: {
            currencyKey: 'link',
          },
          address: '0x983c9a1BCf0eB980a232D1b17bFfd6Bbf68Fe4Ce',
          rewardsAddress: '0x997d4BAbf8290A19EcDCbD10058fC438EB6F30DE',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        },
        {
          token0: {
            currencyKey: 'link',
          },
          token1: {
            currencyKey: 'cfi',
          },
          address: '0xf68c01198cDdEaFB9d2EA43368FC9fA509A339Fa',
          rewardsAddress: '0x9667947B67199C91c109Be912807190cc490A2A3',
          oldRewardsAddress: '0x5662E09d064781Cf2E98732ec3fC7A4a4aB67eA5',
          liqudityUrl:
            'https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4',
        },
      ],
    },
  },
  3: {
    ...networkBaseConfig,
    name: 'Ropsten',
  },
  4: {
    ...networkBaseConfig,
    name: 'Rinkeby',
  },
  5: {
    ...networkBaseConfig,
    name: 'Goerli',
  },
  42: {
    ...networkBaseConfig,
    name: 'Kovan',
    enabled: true,
    preview_url: 'https://kovan.etherscan.io',
    params: {
      tokenAddress: '0xb853881528e2d196A234DE523e169FBD4692604B',
      pools: [
        {
          token0: {
            currencyKey: 'yflink',
          },
          token1: {
            currencyKey: 'chainlink',
          },
          address: '0x23bA2dd800fEDB929132d1E1473918783Abc5Bec',
          rewardsAddress: '0x7aE32f3F236e3C1bd227f347386cE859c04d939F',
          liqudityUrl: '[TODO]',
        },
      ],
    },
  },
};
