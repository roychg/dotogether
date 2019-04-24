import React, { useState } from 'react';
import styled from '@emotion/styled';
import Icon from "components/Icon";
import { FiMoreHorizontal, FiX, FiRotateCcw } from "react-icons/fi";
import { connect } from "react-redux";
import { update_board } from "redux/modules/boards";
import { update_task, set_task } from "redux/modules/tasks";
import { update_list } from "redux/modules/lists";
import Text from 'components/Text'
import Divider from "components/Divider";
import OutsideClickHandler from "react-outside-click-handler";
import ColorPicker from 'components/ColorPicker'

const MenuWrapper = styled.div`
  cursor:pointer;
`

const Menu = styled.div`
  position: absolute;
  right: -1.5em;
  top: 30px;
  width: 240px;
  background: white;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  min-height: 50px;
  border: 1px solid #d3d3d3;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
`;

const MenuInner = styled.div`
  display:flex;
  flex-direction:column;
  color: #333;
`

const ArchivedWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 0 1em;
`

const ArchivedTask = styled.div`
  cursor:pointer;
`



const BoardMenu = ({ reference, update_board, tasks,lists, update_task, set_task, update_list }) => {
  const boardData = { ...reference }
  const taskData = { ...reference, boardType: reference.board.type }
  const listData = { ...reference, boardType: reference.board.type }
  const [menuOpen, toggleMenu] = useState(false)
  const [archiveOpen, toggleArchives] = useState(false)

  const _toggleMenu = () => { toggleMenu(!menuOpen)}
  const _toggleArchives = () => { toggleArchives(!archiveOpen)}

  const _changeColor = async (color) => {
    if(boardData.board.color !== color.hex){
      boardData.board.color = color.hex
      try {
        await update_board(boardData)
      } catch (error) {
        console.log('err while changing a color ' , error)
      }
    }
  }

  const _updateArchived = async (type, id) => {
    if(type === 'tasks'){
      taskData.sid = id;
      taskData.isArchived = false
      await update_task(taskData)
    }else{
      listData.sid = id;
      listData.isArchived = false;
      await update_list(listData);
    }
    // console.log(taskData)
  }

  return(
    <>
    <MenuWrapper onClick={_toggleMenu}>
      {menuOpen ? <Icon icon={<FiX/>} color='#fff' /> : <Icon icon={<FiMoreHorizontal />} color='#fff' />}
    </MenuWrapper>
    {menuOpen &&
      <Menu>
      <OutsideClickHandler onOutsideClick={_toggleMenu}>
        <MenuInner>
          <Text>Menu</Text>
          <Divider/>
          <Text>Change Background Color</Text>
          <ColorPicker onChange={_changeColor} />
          <button onClick={_toggleArchives}>{archiveOpen ? 'Close' : 'Open'} archives</button>
          {
            archiveOpen && 
            <div>
              {tasks.byId.map(id => {
                if(tasks.tasks[id].isArchived){
                  return (
                    <ArchivedWrapper key={id}>
                      <Text color='green'>T</Text>
                      <ArchivedTask onClick={()=>set_task(id)}>
                      <Text >{tasks.tasks[id].title}</Text>
                      </ArchivedTask>
                      <Icon icon={<FiRotateCcw />} onClick={()=>_updateArchived('tasks',id)}/>
                    </ArchivedWrapper>
                  );
                }
                return null
            })}
              {lists.byId.map(id => {
                if(lists.lists[id].isArchived){
                  return (
                    <ArchivedWrapper key={id}>
                      <Text color='green'>L</Text>
                      <ArchivedTask onClick={()=>set_task(id)}>
                      <Text >{lists.lists[id].title}</Text>
                      </ArchivedTask>
                      <Icon icon={<FiRotateCcw />} onClick={()=>_updateArchived('lists',id)}/>
                    </ArchivedWrapper>
                  );
                }
                return null
            })}
            </div>
          }
        </MenuInner>
      </OutsideClickHandler>
      </Menu>
    }
    </>
  )
}

export default connect(
  null, { update_board, update_task, set_task, update_list }
)(BoardMenu);