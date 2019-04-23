import React from 'react';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import Card from 'components/Card'
import Divider from "components/Divider";
import SocialLink from 'components/SocialLink'
import Google from "assets/images/google.svg";
import Text from 'components/Text'

const LandingWrapper = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`


const Landing = props => {
  return(
    <LandingWrapper>
      <Card width={350} height={150} shadow={3} direction='column' align='center'>
        <Text font='lobster two, cursive' fontSize='3em'>
          do.Together
        </Text>
        <SocialLink icon={Google} to='/api/auth/google'/>
        <Divider content='or'/>
        <Text as={Link} to='/demo' font='lobster two, cursive'>Try without Login</Text>
      </Card>
    </LandingWrapper>
  )
}

export default Landing;