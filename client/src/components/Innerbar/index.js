import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';


const innerStyles = props => css`
  display: flex;
  width: 100%;
  max-width: ${props.width || 1280}px;
  justify-content: ${props.justify || 'center'};
  align-items: ${props.align || 'center'};
  // border:1px solid black;
  position:relative;
`;

const InnerWrapper = styled.div`
  ${innerStyles}
`

const Innerbar = ({ children, ...rest }) => {
  return(
    <InnerWrapper {...rest}>
      {children}
    </InnerWrapper>
  )
}

export default Innerbar;