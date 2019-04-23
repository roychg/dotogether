import React from 'react';
import styled from '@emotion/styled';
import {css } from '@emotion/core';

const gridStyles = props => css`
  display: inline-grid;
  grid-gap: ${props.gap || 30}px;
  width: 100%;
  justify-content: ${props.justify || 'flex-start'};
  align-items: center;
  grid-template-columns: repeat(auto-fill, ${props.itemWidth || 120}px);
  margin: 1em 0;
  margin: 0.5em 0 2em 0;
  z-index: 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const GridWrapper = styled.div`
  ${gridStyles}
`

const Grid = ({ children, ...rest }) => {
  return(
    <GridWrapper {...rest}>
      {children}
    </GridWrapper>
  )
}

export default Grid;