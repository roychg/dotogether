import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import PropTypes from "prop-types";

const textStyle = props =>
  css`
    text-align: ${props.align || "center"};
    font-family: ${props.font || "Oxygen, sans-serif"};
    font-size: ${props.fontSize || "1em"};
    text-transform: ${props.type || "inherit"};
    font-weight: ${props.bold === 1 ? "600" : "300"};

    ${props.truncate === 1 &&
      `
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}
    word-break:break-all;
  `;

const TextWrapper = styled.div`
  color: ${props => props.color || "#333"};
  flex: ${props => props.flex && 1};
  overflow: hidden;
  ${props =>
    props.as &&
    `
      text-decoration:none;
      cursor:pointer;
      color: ${props.color} !important;
      &:hover { color:#333 !important; }
    `}
`;

const TextInner = styled(({ component: Component, ...rest }) => (
  <Component {...rest} />
))`
  ${textStyle}
`;

const Text = ({ children, as, to, color, flex, ...rest }) => (
  <TextWrapper className="text" as={as} to={to} color={color} flex={flex}>
    <TextInner {...rest}>{children}</TextInner>
  </TextWrapper>
);

Text.propTypes = {
  truncate: PropTypes.number,
  color: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  font: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  flex: PropTypes.bool,
  component: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "div"
  ])
};

Text.defaultProps = {
  component: "div"
};

export default Text;
