import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import Loading from 'components/Loading'
import { init_board, join_board, leave_board, reset_board } from 'redux/modules/base'
import { reorder_task_same, reorder_task_diff,set_task } from "redux/modules/tasks";
import { reorder_list } from "redux/modules/lists";

const Board = lazy(() => import('../pages/Board'))

class BoardContainer extends Component { 
  

  _init = async () => {
    await this.props.init_board(this.props.boardId);
  }

  _join = async (boardId) => {
    await this.props.join_board(boardId);
  }

  _leave = async () => {
    await this.props.leave_board();
  }
  
  componentDidMount = () => {
    this._init()
    if(this.props.boardType === 'team'){
      this._join(this.props.boardId)
    }
  }

  componentWillUnmount = () => {
    this.props.reset_board()
    if (this.props.boardType === "team") {
      this._leave();
    }
  }

  _onEnd = res => { 
    // console.log('real drag eng ', res)
    const { tasks: { tasks, byId: tbyId }, lists: { lists, byId: lbyId } } = this.props.board_data
    const { type, source, destination, draggableId } = res
    if(!destination) return;
    if(type === 'TASK'){
      const filtered = tbyId
        .filter(tid => ((tasks[tid].lid === destination.droppableId) && !tasks[tid].isArchived))
        .sort((a, b) => (tasks[a].pos > tasks[b].pos ? 1 : -1));

      if(source.droppableId !== destination.droppableId){
        this.props.reorder_task_diff(source, destination, draggableId, filtered);
      }else{
        if(source.index === destination.index) return;
        this.props.reorder_task_same(source, destination, draggableId, filtered);
      }
    }else{
      const filtered = lbyId
        .filter(lid => (!lists[lid].isArchived))
        .sort((a, b) => (lists[a].pos > lists[b].pos ? 1 : -1));
      if(source.index === destination.index) return;
      // console.log("list reorder ", lbyId, lists);
      this.props.reorder_list(source.index, destination.index, draggableId, filtered, false)
    }
  }


  _setTask = (taskId) => {
    this.props.set_task(taskId)
  }


  render(){
    // console.log('board container')
    const { board_data } = this.props
    return(
      <Suspense fallback={<Loading />}>
        <Board
          handleTask={this._setTask}
          board_data={board_data}
          dragEnd={this._onEnd}
        />
      </Suspense>
    )
  }
}

const mapState = ({ boards, lists, tasks, user }) => {
  return {
    board_data: {
      current: boards.currentBoard,
      lists,
      tasks,
      user
    }
  };
};

export default connect(
  mapState,
  {
    init_board,
    reorder_task_same,
    reorder_task_diff,
    reorder_list,
    set_task,
    join_board,
    leave_board,
    reset_board
  }
)(BoardContainer);