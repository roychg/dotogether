import React from "react";
import styled from "@emotion/styled";
import { FiX } from "react-icons/fi";
import Icon from "components/Icon";
import Submit from "components/Button/Submit";

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitAction = ({ onClose, status, content }) => {
  return (
    <ActionWrapper>
      <Submit title={content} />
      <Icon icon={<FiX />} onClick={onClose} color='#d3d3d3'/>
    </ActionWrapper>
  );
};

export default SubmitAction;
