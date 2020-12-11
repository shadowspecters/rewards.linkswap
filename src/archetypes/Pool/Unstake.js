import React from 'react';
import styled from 'styled-components';
import { Field, Panel, Pill } from '@components';
import { Pool } from '@archetypes';
import { units } from '@util/helpers';
import ModalTemplate from './_modalTemplate';
import AppStore from '@app/App.Store';

export default styled(({ address, ...props }) => {
  const { hydrate } = AppStore();

  const position = Pool.usePosition(address);
  const tx = Pool.useUnstakingTransaction({
    address,
    onSuccess: () => hydrate('pool.values', address),
    prevStaked: props.prevStaked,
  });

  return (
    <ModalTemplate address={address} {...props} title={'Unstake'}>
      <Panel disabled={['UNAPPROVED', 'UNCONFIRMED'].includes(tx.status)}>
        <Field.Number
          title={`Currently Staked: ${units.fromWei(
            props.prevStaked ? position?.oldStaked : position?.staked
          )}`}
          info={
            <Pill
              status={'neutral'}
              onClick={() =>
                tx?.setParam('amount', props.prevStaked ? position?.oldStaked : position?.staked)
              }
            >
              MAX
            </Pill>
          }
          value={units.fromWei(tx?.params?.amount || 0)}
          onChange={(amt) => tx?.setParam('amount', units.toWei(amt))}
          min={0}
          max={units.fromWei(props.prevStaked ? position?.oldStaked : position?.staked)}
        />

        <Panel.Footer>{tx.controls}</Panel.Footer>
      </Panel>

      {tx.statusMessage}
    </ModalTemplate>
  );
})`
  text-align: center;

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
