import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import ListTitle from '../ListTitle'
import TasksContainer from "../../Tasks/TasksContainer";
import Adder from "../../Adder";
import ListAdder from '../../Adder/ListAdder'

const Container = styled.div`
  display: inline-flex;
`;

const ListContainer = styled.div`
  // border: 1px solid yellow;
  margin: 0 2.5px;
  flex-direction: column;
  min-height: 0; // firefox
  max-height: 100%; // firefox
  font-size:0.9em;
`;

const List = styled.div`
  display: flex;
  min-height: 0; // firefox
  max-height: 100%; // firefox
  width: 220px;
  flex-direction: column;
  border-radius: 3px;
  background: rgba(10, 10, 10, 0.3);
  ${props => props.isDragging && `
    background:rgba(10, 10, 10, 0.5);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
  `}
`;

// byId - lists
const ListsContainer = ({ board_data }) => {
  const adderRef = useRef(null)
  const { lists:{ byId, lists }, ...rest } = board_data
  const [adderOpen, toggleAdder] = useState(false)

  useEffect(() => {
    if (adderOpen !== false) {
      adderRef.current.scrollIntoView();
    }
  });

  return (
    <Droppable droppableId="container" type="LIST" direction="horizontal">
      {provided => (
        <>
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {byId.map((id, idx) => (
              <Draggable draggableId={id} index={idx} key={id}>
                {(provided, snapshot) => (
                  <ListContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <List isDragging={snapshot.isDragging}>
                      <ListTitle
                        value={lists[id].title}
                        dragHandle={provided.dragHandleProps}
                        reference = {{
                          persist: board_data.type ? false : true,
                          sid: id,
                          bid: rest.current.sid,
                          boardType: rest.current.type
                        }}
                      />
                      <TasksContainer listId={id} {...rest} />
                    </List>
                  </ListContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
          {adderOpen ? (
            <div ref={adderRef}>
              <ListAdder
                onClose={() => toggleAdder(false)}
                reference={{
                  persist: rest.type ? false : true,
                  bid: rest.current.sid,
                  boardType: rest.current.type,
                  pos: byId.length
                    ? lists[byId[byId.length - 1]].pos + 65535.0
                    : 16358.0
                }}
              />
            </div>
          ) : (
            <Adder type="list" onClick={() => toggleAdder(true)} />
          )}
        </>
      )}
    </Droppable>
  );
};

export default ListsContainer;