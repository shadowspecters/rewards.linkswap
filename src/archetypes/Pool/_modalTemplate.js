import React from 'react';
import styled from 'styled-components';
import { Pool } from '@archetypes';

export default styled(({ address, title, children, ...rest }) => (
  <div {...rest}>
    <Pool.Name address={address} subtitle={title} />
    {children}
  </div>
))`
  .pool-name {
    font-size: var(--font-size-large);
    margin-bottom: 3rem;

    .pool-name-title {
      font-size: var(--font-size-xlarge);
    }

    .pool-name-subtitle {
      font-size: var(--font-size-large);
    }

    .pool-symbol {
      margin-right: var(--theme--spacing, 16px);
    }
  }
`;
