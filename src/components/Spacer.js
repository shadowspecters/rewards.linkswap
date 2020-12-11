import React from 'react';
import styled from 'styled-components';

export default styled(({ className }) => <hr className={className} />)`
  opacity: 0.15;
  height: 0;
  border: none;
  border-bottom: 1px solid currentColor;
  margin: 1.5em 0;

  ${({ loose }) => loose && `margin: 2em 0;`}
  ${({ tight }) => tight && `margin: 1em 0;`}
		${({ invisible }) => invisible && `opacity: 0;`}
`;
