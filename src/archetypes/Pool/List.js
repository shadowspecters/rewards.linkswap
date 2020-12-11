import React from 'react';
import styled from 'styled-components';
import { Status } from '@components';
import { Pool } from '@archetypes';
import AppStore from '@app/App.Store';
import { ReactComponent as LogoYFLink } from '@logo/yflink.svg';

export default styled(({ children, ...props }) => {
  const { state } = AppStore();

  return (
    <section {...props}>
      <header>
        <h1>Participating Pools</h1>
      </header>
      <article>
        {Object.values(state.pool || {}).length <= 0 ? (
          <Status
            icon={<LogoYFLink animate='logospin' />}
            title='Loading pools'
            small
            style={{ opacity: 0.5 }}
          />
        ) : (
          <div>
            <Pool.Row
              yfl
              key={'0x7e5A536F3d79791E283940ec379CEE10C9C40e86'}
              {...state.pool['0x7e5A536F3d79791E283940ec379CEE10C9C40e86']}
            />
            <Pool.Row
              yfl
              key={'0x189A730921550314934019d184EC05726881D481'}
              {...state.pool['0x189A730921550314934019d184EC05726881D481']}
            />
            {Object.values(state.pool || {}).map((pool) => {
              if (
                !(
                  pool.address === '0x7e5A536F3d79791E283940ec379CEE10C9C40e86' ||
                  pool.address === '0x189A730921550314934019d184EC05726881D481'
                )
              ) {
                return <Pool.Row key={pool.address} {...pool} />;
              }
            })}
          </div>
        )}
      </article>
    </section>
  );
})`
  > header {
    margin-bottom: 2.2rem;

    h1 {
      font-size: var(--theme--section--title--font-size, 24px);
      margin: 0;
    }

    h2 {
      font-size: var(--theme--section--subtitle--font-size, 18px);
      margin: 0;
      opacity: 0.6;
    }
  }

  .pool-row + .pool-row {
    margin-top: var(--theme--spacing-tight);
  }
`;
