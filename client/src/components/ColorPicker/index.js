import React from "react";
import { GithubPicker } from "react-color";
import styled from "@emotion/styled";

const PickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.el &&
    `
    border:1px solid pink;
    position:absolute;
  `}
`;
const colors = [
  "#CD5C5C", // indian red
  "#16A085",
  "#CB4335",
  "#34495E",
  "#717D7E",
  "#D4AC0D",
  "#2C6044"
];
const ColorPicker = ({ onChange, ...rest }) => {
  return (
    <PickerWrapper {...rest}>
      <GithubPicker
        width="auto"
        triangle="hide"
        colors={colors}
        onChange={onChange}
      />
    </PickerWrapper>
  );
};

export default ColorPicker;
