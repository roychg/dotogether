import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux'
import { set_task, update_task } from "redux/modules/tasks";
import Icon from 'components/Icon'
import { FiCalendar, FiFileText, FiLayers } from "react-icons/fi";
import { ContextMenuTrigger } from "react-contextmenu";
import ContMenu from "components/ContMenu";

const Container = styled.div`
  min-height: 10px;
  display: flex;
  flex-direction: column;
  color: #333;
  padding: 0.5em;
  user-select:none;
`;

const TaskTitle = styled.div`
  display:flex;
`

const TaskIndicator = styled.div`
  display: flex;
  border-top: 1px solid #d3d3d3;
  margin-top: 0.5em;
  padding-top:5px;
`;


const TaskMenu = (taskData, handleUpdate) => ([
  { id:`arch_${taskData.sid}` , content:'Archive', icon:<FiLayers/>, action: ()=>handleUpdate(taskData) }
])


const Task = ({ isDragging, task, set_task, update_task, taskData: reference, dragHandle }) => {
  const { sid, title, duedate, desc } = task;
  const taskData = {
    sid: sid,
    ...reference
  };

  const _handleArchive = async taskData => {
    taskData.isArchived = true;
    try {
      await update_task(taskData);
    } catch (error) {
      alert("somethig happend while remove task ", error);
    }
  };
  
  return (
    <ContextMenuTrigger id={sid}>
    <Container {...dragHandle} onClick={isDragging ? null : ()=>set_task(sid)}>
        <TaskTitle>
          {title}
          {/* ||| {pos} */}
        </TaskTitle>
        {(duedate || desc) && (
          <TaskIndicator>
            {desc && (
              <Icon
              icon={<FiFileText />}
                right={10}
                color="#849EA5"
                size={12}
                />
              )}
            {duedate && (
              <Icon
              icon={<FiCalendar />}
                color="#DA6748"
                content={duedate}
                size={12}
                right={20}
                />
                )}
          </TaskIndicator>
        )}
      </Container>
      <ContMenu 
        id={sid}
        title={title}
        menus={TaskMenu(taskData, _handleArchive)}
      />
      </ContextMenuTrigger>
  );
};

export default connect(
  null, { set_task, update_task }
)(Task);