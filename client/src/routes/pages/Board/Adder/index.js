import React from 'react';
import styled from '@emotion/styled';
import Icon from 'components/Icon'
import { FiPlus } from 'react-icons/fi'

const AdderWrapper = styled.div`
  border-radius: inherit;
  display:flex;
  flex-shrink:0;
  align-items: center;
  height: 35px;
  font-size:0.9em;
  cursor:pointer;
  padding:0 0.5em;
  width:${props => props.type === 'list' ? '220px' : '100%'};
  background-color:${props => props.type === 'list' ? 'rgba(10,10,10,0.2)' : 'rgba(10,10,10,0)'};
  &:hover { 
    background-color: rgba(10,10,10,0.3);
  }
`

const Adder = ({ type, ...rest }) => {
  return(
    <AdderWrapper type={type} {...rest}>
      <Icon icon={<FiPlus/>} right={15} color='#fff'/> Add a new {type}
    </AdderWrapper>
  )
}

export default Adder;