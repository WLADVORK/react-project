import React from 'react';
import './app.css';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

function App() {
  const todoData = [
    {
      description: 'Completed task', state: 'completed', created: 'created 17 seconds ago', id: 1,
    },
    {
      description: 'Editing task', state: 'editing', created: 'created 5 minutes ago', id: 2,
    },
    {
      description: 'Active task', state: 'active', created: 'created 5 minutes ago', id: 3,
    },
  ];
  const todoLength = todoData.length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer length={todoLength} />
      </section>
    </section>
  );
}

export default App;
