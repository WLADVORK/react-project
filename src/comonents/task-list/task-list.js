import React from 'react';
import PropTypes from 'prop-types';
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

TaskList.defaultProps = {
  todos: [{
    description: 'error',
    taskState: 'active',
    id: 0,
  }],
  onCompleted: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default TaskList;
