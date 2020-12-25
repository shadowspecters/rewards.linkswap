import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconSpinner } from '@icon/spinner.svg';
import { ReactComponent as IconQuestion } from '@icon/question.svg';

const Loader = styled(({ icon, className }) => {
  const [_icon, _setIcon] = useState(icon || <IconSpinner animate='spin' />);

  useEffect(() => {
    setTimeout(() => {
      _setIcon && _setIcon(<IconQuestion />);
    }, 4000);
  }, []);

  return <span className={`lazyboi ${className}`}>{_icon}</span>;
})`
  > svg {
    opacity: 0.3;
    width: 0.7em;
    height: 0.7em;
    display: block;

    &.-not-found {
      opacity: 0.2;
    }
  }
`;

const Value = ({ prefix, suffix, value, format }) => (
  <Fragment>
    {prefix} {typeof format === 'function' ? format(value) : value} {suffix}
  </Fragment>
);

export default (props) =>
  props.value !== null && props.value !== undefined ? (
    <Value {...props} />
  ) : (
    <Loader icon={props.loadingIcon} />
  );
