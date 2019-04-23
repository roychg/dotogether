import React, { useState } from "react";
import styled from "@emotion/styled";
import SubmitAction from "components/SubmitAction";
import { connect } from "react-redux";
import { add_list } from "redux/modules/lists";
import { generateId } from "utils/helpers";

const AdderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width:100%;
  font-size:inherit;
  margin-bottom: 5px;
`

const Form = styled.form`
  width: 220px;
  background: rgba(10, 10, 10, 0.3);
  padding: 0.5em;
`;

const ListAdder = ({ reference, onClose, add_list }) => {
  const listData = { ...reference };
  
  // generate random Id, and archive status if the board is demo
  if (!reference.persist) {
    listData.sid = generateId();
    listData.isArchived =  false
  }

  const [val, handleValue] = useState("");

  const _handleSubmit = async e => {
    e.preventDefault();
    // Todo: input validator
    listData.title = val;
    try {
      const result = await add_list(listData);
      if (result) handleValue("");
    } catch (err) {
      console.log("handle error");
    }
  };
  return (
    <AdderWrapper>
      <Form onSubmit={_handleSubmit}>
        <Input
          autoFocus
          autoComplete="off"
          name="title"
          placeholder="Add a list title.."
          value={val}
          onChange={e => handleValue(e.target.value)}
        />
        <SubmitAction content='add' onClose={onClose} />
      </Form>
    </AdderWrapper>
  );
};

export default connect(
  null,
  { add_list }
)(ListAdder);
