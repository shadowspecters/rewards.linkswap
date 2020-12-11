import React from 'react';
import styled from 'styled-components';
import { LazyBoi } from '@components';
import AppStore from '@app/App.Store';

export default styled(({ className, ...rest }) => {
  const { state } = AppStore();

  return state?.account.status === 'CONNECTED' ? (
    <span className={`account-balance ${className}`}>
      <div>
        <LazyBoi value={state.account?.balance?.eth} /> ETH
      </div>
      <div>
        <LazyBoi value={state.account?.balance[state.network?.params?.tokenAddress]} /> YFL
      </div>
    </span>
  ) : null;
})`
  font-size: var(--font-size-xsmall);
  line-height: 1em;
  > div {
    vertical-align: baseline;
  }
`;
