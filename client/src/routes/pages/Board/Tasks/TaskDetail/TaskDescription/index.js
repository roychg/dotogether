import React, { useState } from 'react';
import styled from '@emotion/styled';
import AutosizeTextArea from 'react-autosize-textarea'
import Text from 'components/Text'
import OutsideClickHandler from "react-outside-click-handler";
import SubmitAction from 'components/SubmitAction'

const Form = styled.form`
  // background-color: rgba(10, 10, 10, 0.3);
  min-height: 40px;
`;

const TextArea = styled(AutosizeTextArea)`
  resize: none;
  font-size:inherit;
  width:100%;
  padding: 0.3em 0 0.3em 0.3em; 
`

const Description = styled.div`
  border-radius: 2px;
  background-color: rgba(10, 10, 10, 0.13);
  min-height: 40px;
  padding: 0.3em 0 0.3em 0.3em;
  cursor:pointer;
`;

const TaskDescription = ({ value, handleUpdate, reference }) => {
  const taskData = {...reference }
  const [isEditing, setEdit] = useState(false)
  const [val, handleValue] = useState(value)

  const _handleSubmit = async e => {
    e.preventDefault()
    taskData.desc = val
    // console.log('submit clicked ', taskData)
    await handleUpdate(taskData)
    setEdit(false)
  }

  if(isEditing){
    return (
      <OutsideClickHandler onOutsideClick={() => setEdit(false)}>
        <Form onSubmit={_handleSubmit}>
          <TextArea
            rows={3}
            value={val}
            autoFocus
            onChange={e => handleValue(e.target.value)}
          />
          <SubmitAction content='save' onClose={()=>setEdit(false)}/>
        </Form>
      </OutsideClickHandler>
    );
  }
  return(
    <Description onClick={()=>setEdit(true)}> 
      <Text align='left'>
        {value ? value : 'Add a task description'}
      </Text>
    </Description>
  )
}

export default TaskDescription;