import React from 'react';
import styled from '@emotion/styled';
import { connect} from 'react-redux'
import { update_task } from 'redux/modules/tasks'
import {FiAperture, FiFileText, FiCalendar } from 'react-icons/fi'
import Text from 'components/Text'
import SectionHeader from "./SectionHeader";
import TaskTitle from './TaskTitle'
import TaskDescription from "./TaskDescription";
import TaskDueDate from "./TaskDueDate";
import ArchiveHandler from "./ArchiveHandler";

const DetailWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding: 1em;
`

// Add archived indicator - better style
const TaskDetail = ({ task, update_task, board, isDemo }) => {
  const reference = ({
    persist: isDemo ? false : true,
    sid: task.sid,
    boardType: board.type
  })

  return (
    <>
      {task.isArchived && <ArchiveHandler isArchived={task.isArchived} handleUpdate={update_task} reference={reference}/>}
    <DetailWrapper>
      <SectionHeader icon={<FiAperture />}>
        <TaskTitle
          value={task.title}
          handleUpdate={update_task}
          reference={reference}
        />
      </SectionHeader>

      <SectionHeader icon={<FiFileText />}>
        <Text align="left">Description</Text>
      </SectionHeader>
      <TaskDescription
        value={task.desc}
        handleUpdate={update_task}
        reference={reference}
      />

      <SectionHeader icon={<FiCalendar />}>
        <Text align="left">Due Date</Text>
      </SectionHeader>
      <TaskDueDate
        value={task.duedate}
        handleUpdate={update_task}
        reference={reference}
      />
    </DetailWrapper>
    </>
  );
}

export default connect(
  null, { update_task }
)(TaskDetail);