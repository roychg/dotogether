import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from '../Task'
import Adder from '../../Adder'
import TaskAdder from '../../Adder/TaskAdder'

// import {  update_task } from 'redux/modules/tasks'
// import { connect } from 'react-redux'


const Container = styled.div`
  display:flex;
  flex-direction:column;
  min-height:0;
  max-height:100%;
`;

const TaskContainer = styled.div`
  border-radius: 3px;
  background-color: #fff;
  margin-bottom:5px;
`

const Cons = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 0.5em;
  min-height: 10px;
`;

const TasksContainer = ({ listId, current, type, update_task, tasks:{ tasks, byId, selected } }) => {
  const listTasks = 
    byId
      .filter(id => ((tasks[id].lid === listId) && (!tasks[id].isArchived) ))
      .sort((a,b) => tasks[a].pos > tasks[b].pos ? 1 : -1)

  const adderRef = useRef(null)
  const [adderOpen, toggleAdder] = useState(undefined);
  // console.log(selected)
  const taskData = {
    persist: type ? false : true,
    lid: listId,
    bid: current.sid,
    boardType: current.type
  };
  
  useEffect(() => {
    if(adderOpen !== undefined){
      adderRef.current.scrollIntoView();
    }
  })
  return(
    <>
    <Droppable droppableId={listId} type="TASK" direction="vertical">
      {provided => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Cons>
              {listTasks.map((id, idx) => (
                <Draggable draggableId={id} index={idx} key={id}>
                  {(provided, snapshop) => (
                    <TaskContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                        <Task
                          task={tasks[id]}
                          dragHandle={provided.dragHandleProps}
                          boardType={current.type}
                          taskData={taskData}
                          isDragging={snapshop.isDragging}
                        />
                      
                    </TaskContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {/* Task Adder */}
              {adderOpen === listId && (
                <div ref={adderRef}>
                  <TaskAdder
                    onClose={() => toggleAdder(undefined)}
                    reference={{
                      ...taskData,
                      pos: listTasks.length
                        ? tasks[listTasks[listTasks.length - 1]].pos +
                          65535.0
                        : 16358.0
                    }}
                  />
                </div>
              )}
            </Cons>
          </Container>
        );
      }}
    </Droppable>
    {
      adderOpen === undefined &&
      <Adder type='task' onClick={()=>toggleAdder(listId)}/>
    }
    </>
  )
}

// export default connect(
//   null, { update_task }
// )(TasksContainer)

export default TasksContainer;