import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';
import { statusColor } from '@app/App.Status';

export default styled(({ text, children, className, ...rest }) => (
  <span className={`pill ${className}`} {...omit(rest, ['status', 'lifted', 'small', 'large'])}>
    {text || children}
  </span>
))`
  padding: 0.2em 0.6em;
  background: white;
  color: black;
  display: inline;
  width: auto;
  background: grey;
  color: var(--color-light);
  text-transform: uppercase;
  font-size: var(--font-size-xsmall, 12px);
  margin: 0 0.3em;
  border-radius: var(--theme--border-radius--small);
  line-height: 1.7em;

  ${({ status }) => statusColor('background', status)}

  ${({ lifted }) =>
    !!lifted &&
    `
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.05);
	`}

	${({ small }) =>
    !!small &&
    `
		padding: 0.3em 0.7em 0.25em;
	`}

	${({ large }) =>
    !!large &&
    `
		width: 2em;
		height: 2em;
	`}

	${({ onClick }) =>
    !!onClick &&
    `
		cursor: pointer;
	`}
`;
