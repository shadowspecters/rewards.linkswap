import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';
import { statusColor } from '@app/App.Status';
import { ReactComponent as IconSpinner } from '@icon/spinner.svg';

const Button = styled(({ loading, children, className, ...rest }) => {
  // make sure all children are wrapped in a node
  const warppedChildren = React.Children.map(children, (child) =>
    typeof child === 'string' ? (
      <span className='-button-wrapped-string-child'>{child}</span>
    ) : (
      child
    )
  );

  const El = rest?.href ? 'a' : 'button';

  return (
    <El
      className={`button ${className}`}
      data-loading={loading}
      {...omit(rest, ['compact', 'large', 'inline', 'heavy', 'action', 'strong'])}
    >
      {warppedChildren}
      {loading === true && <IconSpinner animate='spin' />}
    </El>
  );
})`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  padding: 0.8em 0.7em;
  border: none;
  color: currentColor;
  background: #55616e;
  font-size: var(--theme--button--font-size, 16px);
  letter-spacing: 0.05em;
  border-radius: var(--theme--border-radius--small);
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  ${({ status }) => statusColor('background', status)}
  ${({ compact }) => !!compact && `font-size: var(--theme--button--font-size--small, 14px);`}
		${({ large }) => !!large && `font-size: var(--theme--button--font-size--large, 20px);`}
		${({ strong }) => !!strong && `font-weight: bold;`}

		>* {
    color: inherit;
    z-index: 1;
    margin: 0 0.3em;
    line-height: 1em;
  }

  > svg {
    display: inline-block;
    height: 1em;
    width: auto;
    fill: currentColor;
  }

  & + .button {
    margin-left: 0.8rem;
  }

  &[disabled],
  &[data-loading='true'] {
    pointer-events: none;
    opacity: 0.4;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: not-allowed;
      pointer-events: all;
      ${({ loading }) => !!loading && `cursor: wait;`}
    }

    ${({ disabled }) =>
      typeof disabled === 'string' &&
      `
				&:after{
					content: '${disabled}';
					position: absolute;
					top: -0.8em;
					right: -0.8em;
					background: var(--color-primary-1);
					padding: 0.1em 0.6em;
					font-size: 0.8em;
					opacity: 1;
				}
			`}
  }

  ${({ outline }) =>
    outline &&
    `
			border: 1px solid currentColor;
			background: none;
		`}
`;

Button.Icon = styled(({ icon, className, ...rest }) => (
  <button className={`button-action ${className}`} {...rest}>
    {icon}
  </button>
))`
  ${({ compact }) =>
    !!compact ? `font-size: var(--font-size-small);` : `font-size: var(--font-size-normal);`}

  border: none;
  background: none;
  cursor: pointer;
  width: 4.3rem;
  height: 4.3rem;
  position: relative;
  padding: 0;
  margin: 0;
  display: block;
  border-radius: 6px;
  background: #55616e;

  > svg {
    font-size: 1em;
    width: 1.3rem;
    height: 1.3rem;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    margin: 0;
  }

  &:hover {
    opacity: 1;
  }

  ${({ outline }) =>
    outline &&
    `
			border: 1px solid currentColor;
			background: none;
		`}
`;

export default Button;
