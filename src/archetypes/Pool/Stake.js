import React from 'react';
import styled from 'styled-components';
import { Field, Panel, Pill } from '@components';
import { Pool } from '@archetypes';
import { units } from '@util/helpers';
import ModalTemplate from './_modalTemplate';
import AppStore from '@app/App.Store';

export default styled(({ address, ...props }) => {
  const { hydrate } = AppStore();

  const pool = Pool.usePool(address);
  const tx = Pool.useStakingTransaction({
    address,
    onSuccess: () => hydrate('pool.values', address),
  });

  return (
    <ModalTemplate address={address} {...props} title={'Stake'}>
      <Panel disabled={['UNAPPROVED', 'UNCONFIRMED'].includes(tx.status)}>
        <Field.Number
          title={`Available LP Tokens: ${units.fromWei(pool.userPosition?.balance)}`}
          info={
            <Pill
              status={'neutral'}
              onClick={() => tx?.setParam('amount', pool.userPosition?.balance)}
            >
              MAX
            </Pill>
          }
          value={units.fromWei(tx?.params?.amount || 0)}
          onChange={(amt) => tx?.setParam('amount', units.toWei(amt))}
          min={0}
          max={units.fromWei(pool.userPosition?.balance)}
        />

        <Panel.Footer>{tx.controls}</Panel.Footer>
      </Panel>

      {tx.statusMessage}
    </ModalTemplate>
  );
})`
  text-align: center;

  .panel {
  }

  .pill {
    filter: brightness(0.6);
    &:hover {
      filter: brightness(0.8);
    }
  }

  .transaction-status {
    margin: var(--theme--spacing-loose) auto 0;
  }
`;
