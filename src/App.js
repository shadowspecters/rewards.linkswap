import { hot } from 'react-hot-loader/root';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import GlobalStyle from './App.Style';
import { Modal, Notification, Panel, Spacer } from '@components';
import { Centered } from '@layouts';
import { Pool } from '@archetypes';

const StyledNotification = styled(Notification)`
  z-index: 99;
`;

const StyledModal = styled(Modal)`
  z-index: 98;
`;

const LearnPanel = () => (
  <Panel title="YFL liqudity staking">
    <Panel.Header>Learn more about YFL staking</Panel.Header>

    <p>Lorem ipsum </p>
  </Panel>
);

const Layout = hot((props) => (
  <Fragment>
    <GlobalStyle />
    <Centered title="Linkswap LP Rewards" {...props}>
      {/* <LearnPanel/>
				<Spacer invisible/> */}
      <Pool.Index />
    </Centered>
  </Fragment>
));

export default () => (
  <Fragment>
    <GlobalStyle />
    <StyledNotification />
    <StyledModal />
    <Layout />
  </Fragment>
);
