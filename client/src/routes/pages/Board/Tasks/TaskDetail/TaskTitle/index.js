import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AutosizeInput from "react-input-autosize";
import OutsideClickHandler from "react-outside-click-handler";
// import { connect } from "react-redux";
// import { update_list } from "redux/modules/lists";

const Form = styled.form`
  min-height: 30px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  cursor: pointer !important;
  min-height: 30px;
  flex-shrink: 0;
`;

const inputStyle = {
  fontSize: "1.2em",
  border:'none',
  borderBottom: "1px solid black",
  outline:'none',
  padding:0

};

const TaskTitle = ({ value, reference, handleUpdate }) => {
  const taskData = { ...reference };
  const [isEditing, setEdit] = useState(false);
  const [val, handleValue] = useState("");

  useEffect(() => {
    // console.log("changed ", value);
    handleValue(value);
  },[value]);

  const _handleValue = e => {
    const { value } = e.target;
    handleValue(value);
  };

  const _handleSubmit = async e => {
    e.preventDefault();
    taskData.title = val;
    // console.log('submit from title ', taskData)
    // console.log("submit clicked ", listData);
    try {
      await handleUpdate(taskData);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isEditing) {
    return (
      <OutsideClickHandler onOutsideClick={() => setEdit(false)}>
        <Form onSubmit={_handleSubmit}>
          <AutosizeInput
            name=""
            autoFocus
            autoCorrect='off'
            spellCheck={false}
            value={val}
            onChange={_handleValue}
            inputStyle={inputStyle}
          />
        </Form>
      </OutsideClickHandler>
    );
  }
  return (
    <Title onClick={() => setEdit(true)}>
      {value}
    </Title>
  );
};

export default TaskTitle