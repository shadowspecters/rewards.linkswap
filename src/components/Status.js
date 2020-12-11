import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

export default styled(({ icon, title, info, link, className, ...rest }) => (
  <div className={`status ${className}`} {...omit(rest, ['small', 'large'])}>
    {icon}

    <span>
      {title && <span className="status-title">{title}</span>}

      {info && <span className="status-info">{info}</span>}

      {link}
    </span>
  </div>
))`
  display: inline-flex;
  align-items: center;
  width: auto;
  color: inherit;
  text-align: left;

  > svg {
    margin-right: 0.4em;
    font-size: ${({ small, large }) => (!!small ? '3rem' : !!large ? '6rem' : '4.5rem')};
  }

  > span {
    > * {
      display: block;
      line-height: 1em;
    }

    .status-title {
      font-size: var(
        --font-size ${({ small, large }) => (!!small ? '-normal' : !!large ? '-xlarge' : '-large')}
      );
      margin: 0;

      & + .status-info {
        margin-top: 0.7em;
      }
    }

    .status-info {
      font-size: var(
        --font-size ${({ small, large }) => (!!small ? '-xsmall' : !!large ? '-normal' : '-small')}
      );
      margin: 0;

      & + a,
      & + .button {
        margin-top: 0.5em;
      }
    }

    > a,
    > .button {
      font-size: var(
        --font-size ${({ small, large }) => (!!small ? '-xsmall' : !!large ? '-small' : '-xsmall')}
      );
    }
  }
`;
