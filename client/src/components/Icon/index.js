import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Text from 'components/Text'

const iconStyles = props => css`
  margin-left:${props.left || 0}px;
  margin-right:${props.right || 0}px;
  font-size:${props.size || 16}px;
  display:flex;
  align-items:center;
  color:${props.color || '#333'};
  ${props.onClick && `
    cursor:pointer;
  `}
`

const IconWrapper = styled.div`
  ${iconStyles}
`
const Content = styled.div`
  padding-left:10px;
`

const Icon = ({ icon, content, ...rest }) => { 
  return(
    <IconWrapper {...rest}>
      {icon}
      {content &&
      <Content>
        <Text>
          {content}
        </Text>
      </Content>
      }
    </IconWrapper>
  )
}

export default Icon;