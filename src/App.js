import React from 'react'
import Footer from './components/footer/';
import Header from './components/header';
import TaskList from './components/task-list';
import './App.css'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          description: 'Completed task',
          status: 'completed',
          createdDistance: 'created 17 seconds ago',
          id: 1,
        },
        {
          description: 'Editing task',
          status: 'editing',
          createdDistance: 'created 5 minutes ago',
          id: 2,
        },
        {
          description: 'Active task',
          status: 'active',
          createdDistance: 'created 5 minutes ago',
          id: 3,
        }
      ],
    }
  }

  changeStatus = (status, id) => {
    this.setState(({tasks}) => {
      const newTasks = tasks.map(task => {
        const newTask = {...task};
        if(newTask.id === id) {
          newTask.status = status;
        }
        return newTask;
      });
      return {tasks: newTasks};
    });
  }

  deleteTask = (id) => {
    this.setState(({tasks}) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(task => task.id !== id);
      return {tasks: newTasks};
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header/>
        <section className="main">
          <TaskList tasks= {this.state.tasks} changeStatus= {this.changeStatus} deleteTask= {this.deleteTask}/>
          <Footer/>
        </section>
      </section>
    );
  }
}
