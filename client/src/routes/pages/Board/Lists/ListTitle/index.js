import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import AutosizeInput from 'react-input-autosize'
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from 'react-redux'
import { update_list } from 'redux/modules/lists'
import { isValid } from 'utils/helpers'

const Form = styled.form`
  min-height: 30px;
  padding: 0.5em;
`;

const Title = styled.div`
  display:flex;
  align-items:center;
  font-size:1.2em;
  cursor:pointer !important;
  min-Height:30px;
  padding: 0.5em;
  flex-shrink:0;
`

const ListTitle = ({ value, dragHandle, reference, update_list }) => {
  const listData = {...reference}
  const [isEditing, setEdit] = useState(false)
  const [val, handleValue] = useState('')
  
  useEffect(() => {
    handleValue(value);
  }, [value]);

  const _handleValue = e => {
    const { value } = e.target
    handleValue(value)
  }

  const _revert = () => {
    handleValue(value)
    setEdit(false)
  }

  const _handleSubmit = async e => {
    e.preventDefault()

    const isTitleValid = isValid(val, value)
    if(isTitleValid){
      try{
        listData.title = val
        await update_list(listData)
        setEdit(false)
      }catch(err){
        _revert();
      }
    }else{
      _revert()
    }
  }

  if(isEditing){
    return (
      <OutsideClickHandler onOutsideClick={_handleSubmit}>
        <Form onSubmit={_handleSubmit}>
          <AutosizeInput
            name=""
            value={val}
            onChange={_handleValue}
            inputStyle={{ fontSize: "1.2em", padding: 0 }}
          />
        </Form>
      </OutsideClickHandler>
    );
  }
  return (
    <Title onClick={()=>setEdit(true)} {...dragHandle}>
      {value}
    </Title>
  )
}

export default connect(
  null, { update_list }
)(ListTitle);