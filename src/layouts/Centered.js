import React from 'react';
import styled from 'styled-components';
import { Header } from '@components';
import { ReactComponent as Logo } from '@logo/yflink.svg';

const StyledHeader = styled(Header)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const StyledBackgroundLogo = styled(Logo)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60rem;
  opacity: 0.02;
  z-index: 1;

  ${({ x, y }) => `
		top: ${y}rem;
		left: calc(50% + ${x}%);
	`}
`;

const Inner = styled(({ title, children, ...props }) => (
  <div {...props}>
    <h1>{title}</h1>
    {children}
  </div>
))`
  z-index: 2;
  position: relative;
  max-width: calc(90rem + 4vw);
  padding: 2vw;
  margin: 0 auto;

  > h1 {
    margin: 0 0 0.4em 0;
    font-size: var(--theme--title--font-size, 24px);
  }
`;

export default styled(({ title, children, ...props }) => (
  <main {...props}>
    <StyledHeader />
    <StyledBackgroundLogo x={-40} y={45} />
    <StyledBackgroundLogo x={40} y={110} />
    <Inner title={title}>{children}</Inner>
  </main>
))`
  position: relative;
  overflow: hidden;
  background: var(--theme--app--background);
  color: var(--theme--app--color);
  min-height: 100vh;
  padding: 12rem 4vw 6rem;
`;
