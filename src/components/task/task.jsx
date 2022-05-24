import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types';
/*
function Task({id, label, distance, status, changeStatus, deleteTask, editClick}) {

  const toggleCheck = (checked) => {
    changeStatus(checked ? 'completed' : 'active', id);
  }

  return (
    <div className="view">

        <input 
        className= "toggle" 
        checked= {status === 'completed'} 
        type="checkbox" 
        onChange= {(e) => {
          toggleCheck(e.target.checked);
        }}/>

        <label>
          <span className="description">{label}</span>
          <span className="created">{formatDistanceToNow(new Date(distance), {includeSeconds: true, addSuffix: true})}</span>
        </label>
        <button className="icon icon-edit" onClick={() => {
          editClick(label, id, status);
        }}></button>
        <button className="icon icon-destroy" onClick={() => {deleteTask(id)}}></button>
    </div>
  )
}
*/
class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      distance: '',
      intervalId: null,
    }

  }

  static defaultProps = {
    changeStatus: () => {console.log('no')},
    deleteTask: () => {},
    editClick: () => {},
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['completed', 'active', 'editing']).isRequired,
    changeStatus: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.setState({
        distance: formatDistanceToNow(new Date(this.props.distance), {includeSeconds: true, addSuffix: true}),
        intervalId: intervalId,
      });
    }, 1000)
  }

  componentWillUnmount() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const {id, label, status, changeStatus, deleteTask, editClick} = this.props;

    const toggleCheck = (checked) => {
      changeStatus(checked ? 'completed' : 'active', id);
    }

    return (
      <div className="view">
  
          <input 
          className= "toggle" 
          checked= {status === 'completed'} 
          type="checkbox" 
          onChange= {(e) => {
            toggleCheck(e.target.checked);
          }}/>
  
          <label>
            <span className="description">{label}</span>
            <span className="created">{this.state.distance}</span>
          </label>
          <button className="icon icon-edit" onClick={() => {
            editClick(label, id, status);
          }}></button>
          <button className="icon icon-destroy" onClick={() => {deleteTask(id)}}></button>
      </div>
    )
  }
}

export default Task;