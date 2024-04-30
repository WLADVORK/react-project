/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Task from '../task';

import './task-list.css';

function TaskList({ todos, onCompleted, onDeleted }) {
  const elements = todos.map((item) => {
    const { id, taskState, ...rest } = item;
    if (taskState === 'active') {
      return (
        <li key={id}>
          <Task {...rest} onCompleted={() => onCompleted(id)} onDeleted={() => onDeleted(id)} />
        </li>
      );
    }

    if (taskState === 'editing') {
      return (
        <li key={id} className={taskState}>
          <Task {...rest} />
          <input type="text" className="edit" value="Editing task" />
        </li>
      );
    }
    return (
      <li key={id} className={taskState}>
        <Task {...rest} onCompleted={() => onCompleted(id)} onDeleted={() => onDeleted(id)} />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {' '}
      {elements}
      {' '}
    </ul>
  );
}

export default TaskList;
