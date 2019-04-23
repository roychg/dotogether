import React from "react";
import { ScaleLoader } from "react-spinners";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  background: ${localStorage.getItem("bg") || "transparent"};
`;

const override = css`
  div {
    background: linear-gradient(#e66465, #9198e5);
  }
`;

const Loading = () => (
  <Container>
    <ScaleLoader height={20} css={override} />
  </Container>
);

export default Loading;
