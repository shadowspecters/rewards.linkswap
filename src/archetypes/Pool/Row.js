import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Button,
  Countdown,
  LazyBoi,
  Modal,
  Panel,
  Stat,
  Status,
} from '@components';
import { Pool, Account } from '@archetypes';
import { useBit } from '@util/hooks';
import { units, format } from '@util/helpers';
import { useConversion } from '@util/currencyConvert';
import { ReactComponent as IconChevron } from '@icon/chevron_down.svg';
import { ReactComponent as LogoYFLink } from '@logo/yflink.svg';
import { ReactComponent as LogoMetaMask } from '@logo/metamask.svg';

const LoadingPosition = ({ className }) => (
  <Panel className={className}>
    <Status
      icon={<LogoYFLink animate='logospin' />}
      title='Loading position'
      info='Loading your position in this pool'
      //link={<a href="https://etherscan.io" target="_blank">View transaction</a>}
      small
    />
  </Panel>
);

const NoPosition = ({ address, className }) => {
  const pool = Pool.usePool(address);

  return (
    <Panel
      className={className}
      subtitle='Get started by acquiring LINKSWAP Liquidity tokens'
      loose
    >
      <p>
        LINKSWAP LP tokens are required. Once you've added liquidity to the{' '}
        {pool?.token0?.symbol}-{pool?.token1?.symbol} pool you can stake your
        liquidity tokens on this page.
      </p>
      <Button
        status='neutral'
        href={pool?.liqudityUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        Add {`${pool?.token0?.symbol}-${pool?.token1?.symbol}`} liquidity
      </Button>
    </Panel>
  );
};

const HasPosition = styled(({ address, className }) => {
  const { usePosition } = Pool;

  const position = usePosition(address);
  const pool = Pool.usePool(address);

  //const fiat_balance = useConversion(units.fromWei(position?.balance), 'yflink', 'usd')
  //const fiat_staked = useConversion(units.fromWei(position?.staked), 'yflink', 'usd')
  //const fiat_rewards_yfl = useConversion(units.fromWei(position?.reward?.yfl), 'yflink', 'usd')
  //const fiat_rewards_ert = useConversion(units.fromWei(position?.reward?.ert), 'yflink', 'usd')

  if (
    pool?.address === '0xf68c01198cDdEaFB9d2EA43368FC9fA509A339Fa' &&
    position?.reward?.ert
  ) {
    console.log(
      'CFI --- :',
      pool?.token0?.symbol,
      pool?.token1?.symbol,
      position?.reward?.ert
    );
  }

  if (
    pool?.address === '0x37CeE65899dA4B1738412814155540C98DFd752C' &&
    position?.reward?.ert
  ) {
    console.log(
      'MASQ --- :',
      pool?.token0?.symbol,
      pool?.token1?.symbol,
      position?.reward?.ert
    );
  }

  return (
    <Panel className={className}>
      <span>
        <Stat
          title='LINKSWAP LP Balance'
          // info={`≈ ${format.currency(fiat_balance)}`}
          large
        >
          <LazyBoi
            value={position?.balance}
            format={(val) => format.maxDB(units.fromWei(val), 5)}
          />
        </Stat>
        <Button onClick={() => Modal.open(<Pool.Stake address={address} />)}>
          Stake
        </Button>
      </span>
      <span>
        <Stat
          title='Currently Staked'
          //info={`≈ ${format.currency(fiat_staked)}`}
          large
        >
          <LazyBoi
            value={position?.staked}
            format={(val) => format.maxDB(units.fromWei(val), 5)}
          />
        </Stat>
        <Button
          disabled={!+position?.staked}
          onClick={() => Modal.open(<Pool.Unstake address={address} />)}
        >
          Unstake
        </Button>
      </span>
      {pool?.address === '0xf68c01198cDdEaFB9d2EA43368FC9fA509A339Fa' && ( // Show previously staked amount for CFI/LINK pool
        <span>
          <Stat
            title='Previously Staked'
            //info={`≈ ${format.currency(fiat_staked)}`}
            prevStaked={true}
            large
          >
            <LazyBoi
              value={position?.oldStaked}
              format={(val) => format.maxDB(units.fromWei(val), 5)}
            />
          </Stat>
          <Button
            className='prev-unstake'
            disabled={!+position?.oldStaked}
            onClick={() =>
              Modal.open(<Pool.Unstake address={address} prevStaked={true} />)
            }
          >
            Unstake
          </Button>
        </span>
      )}
      {pool?.address !== '0xf68c01198cDdEaFB9d2EA43368FC9fA509A339Fa' && ( // Do not show YFL for CFI/LINK pool
        <span>
          <Stat
            title='Unclaimed YFL'
            //info={`≈ ${format.currency(fiat_rewards_yfl)}`}
            large
          >
            <LazyBoi
              value={position?.reward?.yfl}
              format={(val) => format.maxDB(units.fromWei(val), 5)}
            />
          </Stat>
          <Button
            disabled={!+position?.reward?.yfl}
            onClick={() => Modal.open(<Pool.Claim address={address} />)}
          >
            {position?.reward?.ert ? 'Claim All' : 'Claim'}
          </Button>
        </span>
      )}
      {pool?.address === '0xf68c01198cDdEaFB9d2EA43368FC9fA509A339Fa' &&
        position?.reward?.ert && ( // Show CFI instead of YFL for CFI/LINK pool
          <span>
            <Stat
              title={`Unclaimed CFi`}
              //info={`≈ ${format.currency(fiat_rewards_ert)}`}
              large
            >
              <LazyBoi
                value={position?.reward?.ert}
                format={(val) => format.maxDB(units.fromWei(val), 5)}
              />
            </Stat>
            <Button
              disabled={!+position?.reward?.ert}
              onClick={() => Modal.open(<Pool.Claim address={address} />)}
            >
              {position?.reward?.ert ? 'Claim All' : 'Claim'}
            </Button>
          </span>
        )}
      {(pool?.address === '0x37CeE65899dA4B1738412814155540C98DFd752C' ||
        pool?.address === '0xdef0CEF53E0D4c6A5E568c53EdCf45CeB33DBE46') &&
        position?.reward?.ert && ( // Show MASQ as well as YFL for MASQ/ETH pool's reward
          <span>
            <Stat
              title={
                pool?.address === '0x37CeE65899dA4B1738412814155540C98DFd752C'
                  ? `Unclaimed MASQ`
                  : 'Unclaimed GSWAP'
              }
              //info={`≈ ${format.currency(fiat_rewards_ert)}`}
              large
            >
              <LazyBoi
                value={position?.reward?.ert}
                format={(val) => format.maxDB(units.fromWei(val), 5)}
              />
            </Stat>
            <Button
              disabled={!+position?.reward?.ert}
              onClick={() => Modal.open(<Pool.Claim address={address} />)}
            >
              {position?.reward?.ert ? 'Claim All' : 'Claim'}
            </Button>
          </span>
        )}
    </Panel>
  );
})`
  .panel-content {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > span {
      width: 33%;
      height: 100%;

      .prev-unstake {
        color: #ff3532;
      }
    }
  }

  .button {
    margin-top: 1rem;
  }
`;

const NotConnected = styled(({ className }) => (
  <Panel className={className} loose>
    <Status
      icon={<LogoMetaMask defaultcolor='true' />}
      title='Not Connected'
      info='Connect metamask to view your position'
      link={<Account.Button compact text='Connect Metamask' />}
      small
    />
  </Panel>
))`
  .panel-content {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .status {
      display: inline-flex;
      margin: 0 auto;
      width: auto;
    }
  }
`;

const UserPositionPanel = styled(({ address, open, className }) => {
  const connected = Account.useConnected();
  const position = Pool.usePosition(address);

  if (connected) {
    return !position ? (
      <LoadingPosition className={className} />
    ) : position?.balance > 0 ||
      position?.staked > 0 ||
      position?.reward?.yfl > 0 ||
      position?.reward?.ert > 0 ? (
      <HasPosition address={address} className={className} />
    ) : (
      <NoPosition address={address} className={className} />
    );
  } else {
    return <NotConnected className={className} />;
  }
})`
  max-height: 20rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3) !important;
  margin-top: 2rem;
  transition: all 0.15s;
  opacity: 1;

  ${({ open }) =>
    !open &&
    `
			max-height: 0rem;
			padding: 0;
			margin: 0;
			opacity: 0;
		`}
`;

export default styled(({ address, className, yfl }) => {
  const [open, toggleOpen] = useBit();

  const pool = Pool.usePool(address);
  const deposited = Pool.useDeposited(address);
  const stake = Pool.useUserStake(address);

  let ertSymbol;
  if (pool?.token0?.symbol === 'WETH' || pool?.token0?.symbol === 'LINK') {
    ertSymbol = pool?.token1?.symbol;
  } else {
    ertSymbol = pool?.token0?.symbol;
  }

  return (
    <Panel className={`pool-row ${className}`} data-open={open}>
      <div className={'pool-details'} onClick={() => toggleOpen()}>
        <span className='title-col'>
          <Pool.Name address={address} />
          <Stat inline small light className='countdown'>
            <Countdown prefix='Ends in: ' to={pool?.periodFinish} />
          </Stat>
        </span>

        <span className='stats-group'>
          <span>
            <Stat title='Total Deposited'>
              <LazyBoi
                value={deposited}
                format={(val) => format.currency(val)}
              />
            </Stat>
          </span>
          <span>
            <Stat title='Pool Rate'>
              <div>
                <LazyBoi
                  value={pool?.reward?.yfl?.rate}
                  format={(val) =>
                    format.decimals(units.fromWei(val) * 86400, 6)
                  }
                  suffix={<span className='suffix'> YFL/day</span>}
                />
              </div>
              {pool?.reward?.ert && (
                <div>
                  <LazyBoi
                    value={pool?.reward?.ert?.rate}
                    format={(val) =>
                      format.decimals(units.fromWei(val) * 86400, 6)
                    }
                    suffix={<span className='suffix'> {ertSymbol}/day</span>}
                  />
                </div>
              )}
            </Stat>
          </span>
          <span>
            <Stat title='My Stake'>
              <LazyBoi value={stake} format={(val) => format.currency(val)} />
            </Stat>
          </span>
        </span>

        <span>
          <Button.Icon
            icon={<IconChevron />}
            className='toggle'
            onClick={() => toggleOpen()}
          />
        </span>
      </div>
      <UserPositionPanel address={address} open={open} />
    </Panel>
  );
})`
  transition: all 0.25s ease-in-out;
  z-index: 1;

  .pool-details {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
    //margin-top: 1rem;

    .title-col {
      width: auto;

      .pool-name {
        padding: 1.8rem 2.4rem 1.8rem 2rem;
        background: rgba(255, 255, 255, 0.1);
        margin-bottom: 0.9rem;
        display: inline-flex;
        min-width: 20rem;
      }

      .countdown {
        text-align: center;
      }
    }

    .stats-group {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 71%;

      > span {
        margin-left: 16px;
        width: 33%;
      }
    }

    .suffix {
      font-size: 0.8em;
      opacity: 0.5;
      font-weight: 400;
    }

    &:hover .toggle {
      opacity: 1;
    }
  }

  .toggle {
    opacity: 0.7;
    transition: opacity 0.2s;
    transform: rotate(180deg);
    &:hover {
      opacity: 1;
    }
  }

  &[data-open='false'] {
    .toggle {
      transform: rotate(0deg);
    }
  }

  &[data-open='true'],
  &:hover {
    z-index: 2;
    background: #445363;
  }
`;
