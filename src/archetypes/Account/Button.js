import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Blockie } from '@components';
import { truncateString } from '@util/helpers';
import AppStore from '@app/App.Store';
import { ReactComponent as LogoMetaMask } from '@logo/metamask.svg';

export default styled(
  ({ text = [<LogoMetaMask defaultcolor="true" key={1} />, 'Connect'], className, ...rest }) => {
    const { state, trigger } = AppStore();
    const [el, setEl] = useState(null);

    useEffect(() => {
      switch (state?.account.status) {
        case 'CONNECTING':
          setEl(
            <Button compact className={className} {...rest}>
              Connecting...
            </Button>,
          );
          break;
        case 'CONNECTED':
          setEl(
            <Button
              compact
              onClick={() => trigger('account.disconnect')}
              className={className}
              {...rest}
            >
              <Blockie address={state?.account?.address} diameter={14} />
              {truncateString(state?.account?.address)}
            </Button>,
          );
          break;
        case 'ERROR':
        case 'DISCONNECTED':
        default:
          setEl(
            <Button
              compact
              onClick={() => trigger('account.connect')}
              className={className}
              {...rest}
            >
              {text}
            </Button>,
          );
          break;
      }
    }, [state?.account.status]);

    return el;
  },
)``;
