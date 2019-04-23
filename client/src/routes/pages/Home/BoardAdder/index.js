import React, { useState } from 'react';
import styled from '@emotion/styled';
import ColorPicker from "components/ColorPicker";
import SubmitAction from 'components/SubmitAction'
import Text from "components/Text";
import { connect } from 'react-redux'
import { add_board } from 'redux/modules/boards'
import { isEmpty } from 'utils/helpers'

const Inner = styled.div`
  background: ${props => props.color};
  border-radius: inherit;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
`;

const Input = styled.input`
  width: 200px;
  // height:40px;
  background: inherit;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  color: white;
  font-size: 1em;
  margin: 1.5em 0;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ActionWrapper = styled.div`
  width: 100%;
`;

const BoardAdder = ({ onClose, user, target, add_board }) => {
  const boardType = target === 'personal' ? 'personal' : 'team'
  const boardData = { owner: user.id }
  const [color, setColor] = useState("#2C6044");
  const [val, handleValue] = useState("");

  const _changeColor = (color) => {
    setColor(color.hex)
  };

  const _handleSubmit = async e => {
    e.preventDefault();
    const isNameValid = !isEmpty(val);
    if (isNameValid) {
      try {
        if(target !== 'personal'){
          boardData.teamId = target
        }
        boardData.title = val;
        boardData.color = color;
        boardData.type = boardType;
        await add_board(boardType, boardData);
        onClose();
      } catch (err) {
        onClose();
      }
    }
  };
  
  return (
    <Inner className="modal inner" color={color}>
      <Text color='#fff' font='Playfair Display'>Enter a Board Title</Text>
      <ColorPicker onChange={_changeColor} />
      <Form onSubmit={_handleSubmit}>
        <Input
          autoFocus
          value={val}
          onChange={e=>handleValue(e.target.value)}
          maxLength={25}
        />
        <ActionWrapper>
          <SubmitAction
            content='add'
            onClose={onClose}
          />
        </ActionWrapper>
      </Form>
    </Inner>
  );
}

export default connect(
  null, { add_board }
)(BoardAdder)