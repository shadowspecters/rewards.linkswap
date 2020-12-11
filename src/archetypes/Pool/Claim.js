import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Panel } from '@components';
import { Pool } from '@archetypes';
import { units, format } from '@util/helpers';
import { useConversion } from '@util/currencyConvert';
import ModalTemplate from './_modalTemplate';
import AppStore from '@app/App.Store';

export default styled(({ address, ...props }) => {
  const { hydrate } = AppStore();

  const position = Pool.usePosition(address);
  const tx = Pool.useClaimTransaction({
    address,
    onSuccess: () => hydrate('pool.values', address),
  });

  const fiat_rewards_yfl = useConversion(units.fromWei(position?.reward?.yfl), 'yflink', 'usd');
  const fiat_rewards_ert = useConversion(units.fromWei(position?.reward?.ert), 'yflink', 'usd');

  return (
    <ModalTemplate address={address} {...props} title={'Claim Rewards'}>
      <Panel
        disabled={['UNAPPROVED', 'UNCONFIRMED'].includes(tx.status)}
        //title={`Claim your reward tokens`}
        subtitle="Available rewards to be claimed:"
      >
        <Fragment>
          YFL: {units.fromWei(position?.reward.yfl)} (≈ {format.currency(fiat_rewards_yfl)} USD)
          <br />
          {position?.reward.ert &&
            `ERT: ${units.fromWei(position?.reward.ert)} (≈ ${format.currency(
              fiat_rewards_ert,
            )} USD)`}
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
