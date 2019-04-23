import React from 'react';
import styled from '@emotion/styled';
import Icon from 'components/Icon'

const Container = styled.div`
  display:flex;
  align-items:center;
  min-height:35px;
`

const SectionHeader = ({ children, icon }) => {
  return(
    <Container>
        <Icon icon={icon} right={10}/>
        {children}
    </Container>
  )
}

export default SectionHeader;