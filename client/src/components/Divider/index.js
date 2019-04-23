import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
`;

const Line = styled.div`
  width: 100%;
  border: 0;
  border-radius: 1em;
  border-bottom-width: ${props => props.thickness || "3px"};
  border-style: ${props => props.type || "solid"};
  border-color: ${props => props.color || `rgba(150,150,150,0.2)`};
`;

const Content = styled.span`
  padding: 0 1em;
  background: #fff;
  position: absolute;
  font-family: monospace;
  color: ${props => props.color || `rgba(150,150,150,0.5)`};
`;

const Divider = ({ content, color, ...rest }) => (
  <Wrapper>
    <Line color={color} {...rest} />
    {content && <Content color={color}>{content}</Content>}
  </Wrapper>
);

Divider.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
  content: PropTypes.string,
  type: PropTypes.string
};

export default Divider;
