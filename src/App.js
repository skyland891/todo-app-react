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
          createdDistance: new Date(),
          id: 1,
        },
        {
          description: 'Active task',
          status: 'active',
          createdDistance:  new Date(),
          id: 3,
        }
      ],
      activeFilterName: 'all',
    }
  }

  filterTasks = () => {
    const tasks = JSON.parse(JSON.stringify(this.state.tasks));
    return tasks.filter(task => {
      if(this.state.activeFilterName === 'all') {
        return true;
      }
      return task.status === this.state.activeFilterName;
    });
  }

  changeActiveFilterName = (name) => {
    this.setState({
      activeFilterName: name,
    });
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

  activeCount = () => {
    return this.state.tasks.reduce((accum, task) => {
      return accum + (task.status === 'active' ? 1 : 0);
    }, 0);
  } 

  addTask = (task) => {
    this.setState(({tasks}) => {
      const newTasks = [...JSON.parse(JSON.stringify(tasks)), task];
      return {tasks: newTasks};
    });
  }

  clearCompleted = () => {
    this.setState(({tasks}) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(task => task.status !== 'completed');
      return {tasks: newTasks};
    });
  }

  editDescription = (description, id, prevStatus) => {
    this.setState(({tasks}) => {
      const newTask = JSON.parse(JSON.stringify(tasks))
      .map(task => task.id === id ? {...task, description: description, status: prevStatus} : task);
      return {tasks: newTask};
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTask= {this.addTask}/>
        <section className="main">

          <TaskList 
          tasks= {this.filterTasks()} 
          editDescription= {this.editDescription} 
          changeStatus= {this.changeStatus} 
          deleteTask= {this.deleteTask}/>

          <Footer 
          clearCompleted= {this.clearCompleted} 
          completedTasksCount= {this.activeCount()} 
          changeActiveFilterName= {this.changeActiveFilterName} 
          activeFilterName= {this.state.activeFilterName}/>

        </section>
      </section>
    );
  }
}
