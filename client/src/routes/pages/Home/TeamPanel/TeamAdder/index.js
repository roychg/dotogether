import React, { useState } from 'react';
import styled from '@emotion/styled';
import OutsideClickHandler from "react-outside-click-handler";
import SubmitAction from 'components/SubmitAction'
import { isEmpty } from 'utils/helpers'
import { connect } from 'react-redux'
import { add_team } from 'redux/modules/teams'

const Form = styled.form`
  position: absolute;
  width: 100%;
  min-height: 20px;
  border-radius:3px;
  margin-top:0.3em;
  padding:0.8em;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
`;

const Input = styled.input`
  width:100%;
  font-size:inherit;
  margin-bottom:0.5em;
`



const TeamAdder = ({ onClose, user, add_team }) => {
  const teamData = { creator: user.id }
  const [val, handleValue] = useState('')

  const _handleSubmit = async e => {
    e.preventDefault()
    const isNameValid = !isEmpty(val)
    if(isNameValid){
      try{
        teamData.name = val
        // console.log('add team ', teamData)
        await add_team(teamData)
        onClose()
      }catch(err){
        onClose()
      }
    }
  }

  return(
    <OutsideClickHandler onOutsideClick={onClose}>
      <Form onSubmit={_handleSubmit}>
        <Input
          autoFocus
          spellCheck={false}
          maxLength={25}
          value={val}
          onChange={e=>handleValue(e.target.value)}
          placeholder='Enter a team name..'
        />
        <SubmitAction
          content='ADD'
          onClose={onClose}
        />
      </Form>
    </OutsideClickHandler>
  )
}

export default connect(
  null, { add_team }
)(TeamAdder)