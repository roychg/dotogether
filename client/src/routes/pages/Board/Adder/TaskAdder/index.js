import React, { useState } from 'react';
import styled from '@emotion/styled';
import SubmitAction from "components/SubmitAction";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from 'react-redux'
import { add_task } from 'redux/modules/tasks'
import { generateId } from 'utils/helpers'
const AdderWrapper = styled.div`
  display:flex;
  flex-direction:column;
  margin-bottom:5px;
`

const TextArea = styled(TextareaAutosize)`
  background-color: #fff;
  min-height: 50px;
  resize: none;
  width: 100%;
  border: none;
  padding: 0.5em;
  font-size: inherit;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;


const Form = styled.form`

`

const TaskAdder = ({ value, reference, onClose, add_task }) => {
  const taskData = { ...reference };
  // generate random Id and archive status if the board is demo
  if(!reference.persist) {
    taskData.sid = generateId();
    taskData.isArchived = false;
  }

  const [val, handleValue] = useState('')
  
  const _handleSubmit = async e => {
    e.preventDefault()
    // Todo: input validator
    taskData.title = val
    try{
      const result = await add_task(taskData)
      if(result) handleValue('')
    }catch(err){
      console.log('handle error')
    }
  }
  return (
    <AdderWrapper>
      <Form onSubmit={_handleSubmit}>
        <TextArea
          autoFocus
          name="title"
          placeholder="Add a task title.."
          value={val}
          onChange={e => handleValue(e.target.value)}
        />
        <SubmitAction content='add' onClose={onClose} />
      </Form>
    </AdderWrapper>
  );
}

export default connect(
  null, { add_task }
)(TaskAdder);