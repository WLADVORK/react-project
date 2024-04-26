/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Task from '../task';

import './task-list.css';

function TaskList({ todos }) {
  const elements = todos.map((item) => {
    const { id, state, ...rest } = item;
    if (state === 'active') {
      return (
        <li key={id}>
          <Task {...rest} />
        </li>
      );
    }

    if (state === 'editing') {
      return (
        <li key={id} className={state}>
          <Task {...rest} />
          <input type="text" className="edit" value="Editing task" />
        </li>
      );
    }
    return (
      <li key={id} className={state}>
        <Task {...rest} />
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
