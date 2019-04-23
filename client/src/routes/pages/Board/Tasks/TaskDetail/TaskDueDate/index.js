import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskDueDate = ({ value, handleUpdate, reference }) => {
  // console.log(value)
  // console.log(reference)
  const taskDate = { ...reference };
  const [dueDate, setDate] = useState(null);

  useEffect(() => {
    const parseDate = value ? value : null;
    setDate(parseDate)
  },[value])

  const _handleUpdate = (jsDate, strDate) => {
    // console.log(strDate)
    taskDate.duedate = strDate;
    handleUpdate(taskDate)
  }


  return (
    <DateWrapper> 
      <DatePickerInput
        displayFormat="YYYY/MM/DD"  
        returnFormat="YYYY-MM-DD"
        value={dueDate}
        defaultValue={dueDate}
        showOnInputClick
        placeholder="Set Due Date"
        onChange={_handleUpdate}
      />
    </DateWrapper>
  );
};

export default TaskDueDate;
