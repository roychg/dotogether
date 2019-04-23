import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  height: ${props => props.height || 48}px;
  padding: 0 1.5em;
  justify-content: center;
  // border: 1px solid red;
  position: ${props => props.position || "static"};
  background: ${props => props.home ? "#fff" : props.background};
  width: 100%;
  z-index:1000;
`;

const Appbar = ({ children, ...rest }) => {
  return(
    <Wrapper {...rest}>
      {children}
    </Wrapper>
  )
}

export default Appbar;