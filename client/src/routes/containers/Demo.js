import React, { Component } from 'react';
import { connect } from 'react-redux'
import { enter_guest, reset_user, init_board, join_board } from "redux/modules/base";
import { reorder_task_same, reorder_task_diff, set_task } from "redux/modules/tasks";
import { reorder_list } from "redux/modules/lists";
import Layout from 'components/Layout'
import Board from '../pages/Board'


class DemoContainer extends Component {
  state = { 
    isLoading: true,
    board_data: null,
  }

  _init = async () => {
    await this.props.enter_guest()
    await this.props.init_board("demo");
    await this.props.join_board("demo")
    await this.setState({ board_data: {type:'demo', ...this.props.board_data} })
    this.setState({ isLoading: false });
  }
  
  componentDidMount = () => {
    this._init()
  }

  componentWillUnmount = () => {
    this.props.reset_user()
  }

  componentDidUpdate = (ps,pp) => { 
    if(this.props.board_data !== ps.board_data){
      // console.log('updated')
      // this.setState({ board_data: {type:'demo', ...this.props.board_data }})
      this.setState(prevState => ({
        ...prevState,
        board_data:{
          ...prevState.board_data,
          ...this.props.board_data
        }
      }))
    }
  }

  _dragEnd = res => { 
    // console.log('demo draf eng ', res)
    const { tasks: { tasks, byId: tbyId }} = this.state.board_data
    const { type, source, destination, draggableId } = res
    if(!destination) return;
    if(type === 'TASK'){
      const filtered = tbyId
        .filter(tid => ((tasks[tid].lid === destination.droppableId) && !tasks[tid].isArchived))
        .sort((a, b) => (tasks[a].pos > tasks[b].pos ? 1 : -1));

      if(source.droppableId !== destination.droppableId){
        this.props.reorder_task_diff(source, destination, draggableId, filtered, true);
      }else{
        if(source.index === destination.index) return;
        this.props.reorder_task_same(source, destination, draggableId, filtered, true);
      }
    }else{
      if(source.index === destination.index) return;
      this.props.reorder_list(source.index, destination.index, draggableId, true)
    }
  }

  _setTask = (taskId) => {
    this.props.set_task(taskId)
  }


  render() {
    // console.log(this.state.board_data)
    const { board_data } = this.state
    if(this.state.isLoading) return null
    return (
      <Layout user={board_data.user} loc='demo' home={false}>
        <Board
          handleTask={this._setTask}
          board_data={board_data}
          dragEnd={this._dragEnd}
        />
      </Layout>
    );
  }
}

const mapState = ({ boards, lists, tasks, user }) => { 
  return{ 
    board_data : {
      current: boards.currentBoard,
      lists,
      tasks,
      user
    }
  }
}

export default connect(
  mapState,
  {
    enter_guest,
    reset_user,
    init_board,
    reorder_task_same,
    reorder_task_diff,
    reorder_list,
    set_task, join_board
  }
)(DemoContainer);