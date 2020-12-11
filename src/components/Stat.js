import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

const Stat = styled(({ title, info, children, className, prevStaked, ...rest }) => {
  const [loading, setloading] = useState(false);
  const [redStyle, setRedStyle] = useState('');

  useEffect(() => {
    setloading(true);
    setTimeout(() => setloading(false), 500);
  }, [children]); // eslint-disable-line

  useEffect(() => {
    if (prevStaked) {
      setRedStyle('red');
    }
  }, [prevStaked]);

  return (
    <div
      className={`stat ${className}`}
      data-loading={loading}
      {...omit(rest, ['light', 'inline', 'small', 'large'])}
    >
      <span className={`stat-title ${redStyle}`}>{title}</span>
      <span className={`stat-value ${redStyle}`}>
        <span>{children}</span>
        <span className='stat-value-info'>{info}</span>
      </span>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  width: 100%;
  letter-spacing: 0.016rem;
  color: inherit;
  font-size: var(--theme--stat--font-size, 16px);

  > * {
    margin: 0;
    line-height: 1.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .red {
    color: #ff3532;
  }

  > .stat-title {
    margin-bottom: 0.5em;

    .rotate {
      margin-left: 0.2rem;
      font-size: 0.8em;
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  > .stat-value {
    font-weight: 700;
    .stat-value-info {
      display: block;
      font-size: var(--font-size-xsmall);
      font-weight: 400;
      color: #bdcbda;
    }
  }

  &[data-loading='true'] > .stat-title .rotate {
    opacity: 0.5;
  }

  ${({ inline }) =>
    inline &&
    `
		display: block;
		line-height: 1em;

		>.stat-title,
		>.stat-value{
			margin-bottom: 0;
			white-space: pre;
		}
	`}

  ${({ small }) =>
    small &&
    `
		font-size: var(--font-size-xsmall);
	`}

	${({ large }) =>
    large &&
    `
		>.stat-title{
			margin-bottom: 0.5em;
		}

		>.stat-value{
			font-size: var(--font-size-large);
		}
	`}

	${({ light }) =>
    light &&
    `
		>.stat-value{
			font-weight: 400;
		}
	`}
`;

Stat.Inline = styled((props) => <Stat {...props} />)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > .stat-title,
  > .stat-value {
    margin: 0;
    display: flex;
    align-items: center;
  }
`;

export default Stat;
