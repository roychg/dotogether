import React, { useState } from 'react';
import styled from '@emotion/styled';
import OutsideClickHandler from "react-outside-click-handler";
import TextareaAutosize from 'react-autosize-textarea'
const Adder = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  color: #333;
`;

const Form = styled.form`

  display: flex;
  flex-direction: column;
`;

const TextArea = styled(TextareaAutosize)`
  background-color: #fff;
  min-height: 50px;
  resize: none;
  width: 100%;
  border: none;
  padding: 0.5em;
  font-size: inherit;
  &:focus {
    outline: none;
  }
`;

const Btn = styled.div`
  margin-top: 5px;
`

const TaskAdder = ({ onClose }) => {
  return (
      <OutsideClickHandler onOutsideClick={onClose} >
        <Adder>
          <Form>
            <TextArea 
              autoFocus
              placeholder='Task title..'
            />
            <Btn>add</Btn>
          </Form>
        </Adder>
      </OutsideClickHandler>
  );
}

export default TaskAdder;