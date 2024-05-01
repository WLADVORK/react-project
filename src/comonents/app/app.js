import React from 'react';
import './app.css';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTask('lol'), this.createTask('kek'), this.createTask('super'),
      ],
    };
    this.maxId = 1;
    this.copy = this.state.todoData;
  }

  addTask = (text) => {
    const newItem = this.createTask(text);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
    this.copy = this.state.todoData;
  };

  taskComplete = (id) => {
    this.setState(({ todoData }) => {
      const inx = todoData.findIndex((el) => el.id === id);
      const arr = [...todoData];
      arr[inx].taskState = (arr[inx].taskState === 'completed') ? 'active' : 'completed';
      return {
        todoData: arr,
      };
    });
    this.copy = this.state.todoData;
  };

  taskDeleted = (id) => {
    this.setState(({ todoData }) => {
      const inx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [...todoData.slice(0, inx), ...todoData.slice(inx + 1)],
      };
    });
    this.copy = this.state.todoData; 
  };

  createTask(description) {
    return ({
      description,
      taskState: 'active',
      created: 'agoago',
      id: this.maxId++,
    });
  }

  filterTasks = (buttonType) => {
    this.setState(({todoData}) => {
      let filtered = todoData;

      return {
        todoData: filtered,
      }
    }) 
  }

  render() {
    const todoLength = this.state.todoData.length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={(text) => this.addTask(text)} />
        </header>
        <section className="main">
          <TaskList todos={this.state.todoData} onCompleted={(id) => this.taskComplete(id)} onDeleted={(id) => this.taskDeleted(id)} />
          <Footer length={todoLength} />
        </section>
      </section>
    );
  }
}
