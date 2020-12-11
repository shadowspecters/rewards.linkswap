import React from 'react';
import styled from 'styled-components';
import { Pool } from '@archetypes';

import BUSD from '@token/BUSD.png';
import CEL from '@token/CEL.png';
import CFI from '@token/CFI.png';
import DAI from '@token/DAI.png';
import DPI from '@token/DPI.png';
import WETH from '@token/ETH.png';
import GSWAP from '@token/GSWAP.png';
import LINK from '@token/LINK.png';
import MASQ from '@token/MASQ.png';
import USDC from '@token/USDC.png';
import USDT from '@token/USDT.png';
import YAX from '@token/YAX.png';
import YFL from '@token/YFL.png';

const symbolMappings = {
  BUSD,
  CEL,
  CFi: CFI,
  DAI,
  DPI,
  WETH,
  GSWAP,
  LINK,
  MASQ,
  USDC,
  USDT,
  YAX,
  YFL,
};

export default styled(({ address, className, ...rest }) => {
  const pool = Pool.usePool(address);

  if (symbolMappings[pool?.token0?.symbol]) {
    return (
      <div style={{ display: 'flex' }}>
        <img
          style={{ zIndex: 2, marginTop: 12 }}
          src={symbolMappings[pool.token0.symbol]}
          className={`pool-symbol ${className}`}
          {...rest}
        ></img>
        <img
          style={{ marginLeft: -24 }}
          src={symbolMappings[pool.token1.symbol]}
          className={`pool-symbol ${className}`}
          {...rest}
        ></img>
      </div>
    );
  }

  return <div></div>;
})`
  display: flex;
  font-size: 1em;
  height: 2.6em;
`;
