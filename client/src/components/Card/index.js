import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import PropTypes from "prop-types";
const predefinedShadows = [
  "0",
  "0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);",
  "0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .2), 0 1px 8px 0 rgba(0, 0, 0, .12);",
  "0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);",
  "0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);",
  "0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2);",
  "0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);"
];

const CardUnderlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: inherit;
  background: ${props => props.background || "#fff"};
  z-index: -1;
`;

const cardStyles = props => css`
  width: 100%;
  height: inherit;
  border-radius: inherit;
  display: flex;
  overflow: hidden;
  ${props.padding &&
    `
    padding: ${props.padding}
  `};
  flex-direction: ${props.direction || "row"};
  ${props.truncate &&
    `
  padding-left:5px;
  text-overflow: ellipsis;
  white-space:nowrap;
`}
  ${props.shadow && ` box-shadow: ${predefinedShadows[props.shadow - 1]}; `};
  ${props.clickable &&
    `
  cursor:pointer;
  &:hover {
    background: rgba(150,150,150,0.2);
  }
`};
  justify-content: ${props.justify || "flex-start"};
  align-items: ${props.align || "flex-start"};
  color: ${props.color || "#333"};
  user-select:none;
`;

const CardContent = styled.div`
  ${cardStyles}
`;

const CardWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  display: inline-flex;
  width: ${props => props.width || 150}px;
  min-height: ${props => props.height || 150}px;
  ${props =>
    props.as &&
    `
    color: ${props.color || "#333"};
    text-decoration:none;
    &:hover {
      background: linear-gradient(to bottom, rgba(50,50,50,0.0), rgba(50,50,50,0.8))
    };
  `};
`;

const Card = ({
  children,
  as,
  to,
  background,
  width,
  height,
  color,
  ...rest
}) => (
  <CardWrapper as={as} to={to} width={width} height={height} color={color}>
    <CardContent className="card-content" {...rest} color={color}>
      {children}
    </CardContent>
    <CardUnderlay className="card-underlay" background={background} />
  </CardWrapper>
);




Card.propTypes = {
  truncate: PropTypes.bool,
  clickable: PropTypes.bool
};

Card.defaultProps = {
  shadow: 1,
  truncate: false,
  clickable: false
};

export default Card;
