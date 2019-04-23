import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const submitStyles = props => css`
  padding: 0.5em;
  background-color: #2ecc71;
  color: #fff;
  border-radius: 3px;
  text-transform:uppercase;
  &:focus { 
    outline:none;
  }
`;

const SubmitBtn = styled.button`
  ${submitStyles}
`

const Submit = ({ title }) => {
  return(
    <SubmitBtn>
      {title}
    </SubmitBtn>
  )
}

export default Submit;