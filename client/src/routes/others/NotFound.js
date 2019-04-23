import React from 'react';
import styled from '@emotion/styled';
import Text from 'components/Text'

const Container = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Inner = styled.div`
  min-height:10px;
`
const NotFound = props => {
  return(
    <Container>
      <Inner>
        <Text font='Playfair Display' fontSize='3em'>
          404
        </Text>
      </Inner>
    </Container>
  )
}

export default NotFound;