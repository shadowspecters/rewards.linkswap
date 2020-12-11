import React from 'react';
import styled from 'styled-components';
import { Pool } from '@archetypes';

export default styled(({ address, subtitle, className, ...rest }) => {
  const pool = Pool.usePool(address);

  return (
    <div className={`pool-name ${className}`} {...rest}>
      <Pool.Symbol address={address} />
      <span>
        <div className="pool-name-title">
          {pool?.token0?.symbol}
          <span>|</span>
          {pool?.token1?.symbol}
        </div>
        {subtitle && <div className="pool-name-subtitle">{subtitle}</div>}
      </span>
    </div>
  );
})`
  display: flex;
  align-items: center;
  border-radius: var(--theme--border-radius);
  font-size: var(--font-size-normal);
  width: 250px;

  .pool-symbol {
    margin-right: 0.4em;
    svg {
      font-size: 2em;
    }
  }

  > span {
    text-align: left;
  }

  .pool-name-title {
    line-height: 1em;
    margin: 0;
    font-size: 1em;

    > span {
      margin: 0 0.7rem;
    }
  }

  .pool-name-subtitle {
    line-height: 1em;
    font-size: var(--font-size-large);
    margin-top: 0.5em;
  }
`;
