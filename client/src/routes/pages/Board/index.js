import React from 'react';
import styled from '@emotion/styled';
import { DragDropContext } from 'react-beautiful-dnd'
import Appbar from 'components/Appbar'
import Innerbar from 'components/Innerbar'
import ListsContainer from './Lists/ListsContainer'
import BoardTitle from './BoardTitle'
import BoardMenu from "./BoardMenu";
import TaskDetail from './Tasks/TaskDetail'
import Modal from 'react-modal'


const BoardWrapper = styled.div`
  margin-top:48px;
  width:100%;
  height:100%;
  overflow:hidden;
  color: #fff;
`

const BoardContent = styled.div`
  display: flex;
  height: calc(100% - 50px);
  overflow-x:auto;
  overflow-y:hidden;
  margin-top:10px;
  &:-webkit-scrollbar { 
    margin: 0 0.5em;
  }
`;

const BoardBackground = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  z-index:-1;
  background: ${props => props.background || '#aaa'};
`


Modal.setAppElement('#root')
const Board = ({ dragEnd, board_data, handleTask }) => {
  const { current, tasks: { selected } } = board_data
  return (
    <React.Fragment>
      <BoardWrapper>
        <Appbar height={30}>
          <Innerbar justify="space-between" width={1700}>
            <BoardTitle
              value={current.title}
              reference={{
                persist: board_data.type ? false : true,
                board: current
              }}
            />
            <BoardMenu
              tasks={board_data.tasks}
              lists={board_data.lists}
              reference={{
                persist: board_data.type ? false : true,
                board: current
              }}
            />
          </Innerbar>
        </Appbar>
        <BoardContent>
          <DragDropContext onDragEnd={dragEnd}>
            <ListsContainer board_data={board_data} />
          </DragDropContext>
        </BoardContent>
      </BoardWrapper>
      <BoardBackground background={current.color} />
      {selected && (
        <Modal
          isOpen={selected !== null}
          contentLabel="Task Detail"
          onRequestClose={() => handleTask(null)}
          className="modal taskDetail"
          overlayClassName="overlay"
        >
          <TaskDetail
            task={selected}
            board={current}
            isDemo={board_data.type ? true : false}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export default Board;