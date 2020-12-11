import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

const Panel = styled(({ title, subtitle, children, className, ...rest }) => {
  const [header, setHeader] = useState();
  const [content, setContent] = useState();
  const [footer, setFooter] = useState();

  useEffect(() => {
    const _children = [];

    React.Children.forEach(children, (child) => {
      switch (child?.type?.displayName || '') {
        case 'PanelHeader':
          setHeader(child);
          break;
        case 'PanelFooter':
          setFooter(child);
          break;
        default:
          _children.push(child);
          break;
      }
    });

    setContent(_children);
  }, [children]);

  return (
    <section className={`panel ${className}`} {...omit(rest, ['loose', 'tight', 'disabled'])}>
      {header}
      <Panel.Content title={title} subtitle={subtitle} children={content} />
      {footer}
    </section>
  );
})`
  background: var(--theme--panel--background);
  border-radius: var(--theme--border-radius);

  .panel-content + .panel-footer {
    padding-top: 0;
  }

  ${({ disabled }) =>
    !!disabled &&
    `
			opacity: 0.5;
			position: relative;
			&:after{
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 5;
				cursor: wait;
			}


		`}

  ${({ loose, tight }) => `
			.panel-content,
			.panel-header,
			.panel-footer{
				padding: var(--theme--spacing${!!loose ? '-loose' : !!tight ? '-tight' : ''}, 16px);
			}
		`}
`;

Panel.Content = styled(({ title, subtitle, children, className, ...props }) => (
  <div className={`panel-content ${className}`} {...props}>
    {title && <h1>{title}</h1>}
    {subtitle && <h2>{subtitle}</h2>}
    {children}
  </div>
))`
  height: 100%;

  > h1 {
    font-size: var(--theme--panel--title--font-size, 24px);
    color: var(--theme--panel--title--color, white);
  }

  > h2 {
    font-size: var(--theme--panel--subtitle--font-size, 18px);
    color: var(--theme--panel--subtitle--color, white);
    font-weight: 700;
  }

  > p {
    font-size: var(--theme--panel--text--font-size, 14px);
    color: var(--theme--panel--text--color, white);

    & + .button {
      margin-top: 0.8em;
    }
  }

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }
`;

Panel.Header = styled(({ children, className, ...rest }) => (
  <div className={`panel-header ${className}`} {...rest}>
    {children}
  </div>
))`
  background: #3b4855;
`;
Panel.Header.displayName = 'PanelHeader';

Panel.Footer = styled(({ children, className, ...rest }) => {
  return (
    <footer className={`panel-footer ${className}`} {...rest}>
      {children}
    </footer>
  );
})`
  display: flex;
  justify-content: flex-end;
`;
Panel.Footer.displayName = 'PanelFooter';

export default Panel;
