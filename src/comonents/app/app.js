import React from 'react';
import './app.css';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

export default class App extends React.Component {
  state = {
    todoData: [
      {
        description: 'Completed task', taskState: 'completed', created: 'created 17 seconds ago', id: 1,
      },
      {
        description: 'Editing task', taskState: 'editing', created: 'created 5 minutes ago', id: 2,
      },
      {
        description: 'Active task', taskState: 'active', created: 'created 5 minutes ago', id: 3,
      },
    ],
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
  };

  taskDeleted = (id) => {
    this.setState(({ todoData }) => {
      const inx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [...todoData.slice(0, inx), ...todoData.slice(inx + 1)],
      };
    });
  };

  render() {
    const todoLength = this.state.todoData.length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={this.state.todoData} onCompleted={(id) => this.taskComplete(id)} onDeleted={(id) => this.taskDeleted(id)} />
          <Footer length={todoLength} />
        </section>
      </section>
    );
  }
}
