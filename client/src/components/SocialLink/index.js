import React from 'react';
import styled from '@emotion/styled';
import Avatar from 'components/Avatar'
import Text from 'components/Text'

const LinkWrapper = styled.a`
  margin:1em 0;
  display:flex;
  align-items:center;
  ${props => props.content && `
    border-radius: 3px;
    border: 1px solid #d3d3d3;
  `}
`

const Content = styled.div`
  margin-left:1em;
`

const SocialLink = ({ icon, provider, to }) => {
  return(
    <LinkWrapper href={to} content={provider ? 1 : 0}>
      <Avatar src={icon} background='transparent' size={25}/>
      { provider === 1 &&
        <Content>
          <Text>{provider} Login</Text>
        </Content>
      }
    </LinkWrapper>
  )
}

export default SocialLink;