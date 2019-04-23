import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { update_board } from "redux/modules/boards";
import AutosizeInput from 'react-input-autosize'
import styled from '@emotion/styled';
import OutsideClickHandler from "react-outside-click-handler";
import { isValid } from 'utils/helpers'

const Title = styled.div`
 font-size:1.3em;
 cursor:pointer;
`

const Form = styled.form`
`

const BoardTitle = ({ value, reference, update_board }) => {
  const boardData = { ...reference }
  const [isEditing, toggleEdit] = useState(false)
  const [val, handleValue] = useState('');

  useEffect(() => {
    handleValue(value)
  },[value])

  const _revert = () => {
    handleValue(value)
    toggleEdit(false)
  }

  const _handleSubmit = async e => {
    e.preventDefault()
    const isTitleValid = isValid(val, value)
    if(isTitleValid){
      boardData.board.title = val
      await update_board(boardData);
      toggleEdit(false)
    }else{
      _revert()
    }
  }


  if(isEditing){
    return(
      <OutsideClickHandler onOutsideClick={_handleSubmit}>
        <Form onSubmit={_handleSubmit}>
          <AutosizeInput
            inputStyle={{ fontSize:'1.3em' }}
            value={val}
            onChange={e=>handleValue(e.target.value)}
          />
        </Form>
      </OutsideClickHandler>
    )
  }
  return(
    <Title onClick={()=>toggleEdit(true)}>
      {value}
    </Title>
  )
}

export default connect(
  null,
  { update_board }
)(BoardTitle);