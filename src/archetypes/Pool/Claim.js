import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Panel } from '@components';
import { Pool } from '@archetypes';
import { units, format } from '@util/helpers';
import { useConversion } from '@util/currencyConvert';
import ModalTemplate from './_modalTemplate';
import AppStore from '@app/App.Store';

export default styled(({ address, ...props }) => {
  const { hydrate } = AppStore();
  const [ertTokenName, setErtTokenName] = useState('');

  const position = Pool.usePosition(address);
  const pool = Pool.usePool(address);
  const tx = Pool.useClaimTransaction({
    address,
    onSuccess: () => hydrate('pool.values', address),
  });

  const fiat_rewards_yfl = useConversion(
    units.fromWei(position?.reward?.yfl),
    'yflink',
    'usd'
  );
  const fiat_rewards_ert = useConversion(
    units.fromWei(position?.reward?.ert),
    'yflink',
    'usd'
  );

  useEffect(() => {
    switch (pool?.address) {
      case '0xdef0CEF53E0D4c6A5E568c53EdCf45CeB33DBE46': // LINK/GSWAP pool
        setErtTokenName('GSWAP');
        break;
      case '0x626B88542495d2e341d285969F8678B99cd91DA7':
        // LINK/YAX pool
        setErtTokenName('YAX');
        break;
      case '0x37CeE65899dA4B1738412814155540C98DFd752C':
        // MASQ/WETH pool
        setErtTokenName('MASQ');
        break;
      case '0x639916bB4B29859FADF7A272185a3212157F8CE1':
        // LINK/CELL pool
        setErtTokenName('CEL');
        break;
      case '0xFe04c284a9725c141CF6de85D7E8452af1B48ab7':
        // DPI/LINK pool
        setErtTokenName('DPI');
        break;
      case '0x9d996bDD1F65C835EE92Cd0b94E15d886EF14D63': // LINK/USDC pool
      case '0x983c9a1BCf0eB980a232D1b17bFfd6Bbf68Fe4Ce': // BUSD/LINK pool
      default:
        setErtTokenName('');
        break;
    }
  }, [pool]); // eslint-disable-line

  return (
    <ModalTemplate address={address} {...props} title={'Claim Rewards'}>
      <Panel
        disabled={['UNAPPROVED', 'UNCONFIRMED'].includes(tx.status)}
        //title={`Claim your reward tokens`}
        subtitle='Available rewards to be claimed:'
      >
        <Fragment>
          YFL: {units.fromWei(position?.reward.yfl)}
          <br />
          {position?.reward.ert &&
            ertTokenName.length > 0 &&
            `${ertTokenName}: ${units.fromWei(position?.reward.ert)}`}
        </Fragment>

        <Panel.Footer>{tx.controls}</Panel.Footer>
      </Panel>

      {tx.statusMessage}
    </ModalTemplate>
  );
})`
  text-align: center;

  .panel-footer {
    justify-content: center;
  }

  .transaction-status {
    margin: var(--theme--spacing-loose) auto 0;
  }
`;
