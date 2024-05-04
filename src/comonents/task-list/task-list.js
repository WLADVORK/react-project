import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

function TaskList({ todos, onCompleted, onDeleted }) {
  const elements = todos.map((item) => {
    const { id, taskState, description } = item
    if (taskState === 'active') {
      return (
        <li key={id}>
          {/* eslint-disable-next-line max-len */}
          <Task description={description} onCompleted={() => onCompleted(id)} onDeleted={() => onDeleted(id)} />
        </li>
      )
    }

    if (taskState === 'editing') {
      return (
        <li key={id} className={taskState}>
          <Task description={description} />
          <input type="text" className="edit" value="Editing task" />
        </li>
      )
    }
    return (
      <li key={id} className={taskState}>
        {/* eslint-disable-next-line max-len */}
        <Task description={description} onCompleted={() => onCompleted(id)} onDeleted={() => onDeleted(id)} />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [
    {
      description: 'error',
      taskState: 'active',
      id: 0,
    },
  ],
  onCompleted: () => {},
  onDeleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
}

export default TaskList
