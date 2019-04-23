import React from "react";
import styled from "@emotion/styled";

const AvatarWrapper = styled.div`
  user-select:none;
  width: ${props => props.size || 35}px;
  height: ${props => props.size || 35}px;
  border-radius: 50%;
  background-color:${props => props.background ||'#d3d3d3'};
  color:${props => props.color ||'#333'};
  ${props =>
    props.clickable &&
    `
    cursor:pointer;
  `}
`;

const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: inherit;
`;

const Content = styled.div`
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color:transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = ({ src, content, ...rest }) => {
  return (
    <AvatarWrapper {...rest}>
      {src ? <Image src={src} /> : <Content>{content}</Content>}
    </AvatarWrapper>
  );
};

export default Avatar;
