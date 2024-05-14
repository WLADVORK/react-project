/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

function TaskList({ todos, onCompleted, onDeleted, changeCreatedTime, startTimer, stopTimer, stopCreatedTimeTimer }) {
  const elements = todos.map((item) => {
    const { id, taskState, description, min, sec, timeCreatedFormat } = item
    if (taskState === 'active') {
      return (
        <li key={id}>
          <Task
            description={description}
            onCompleted={() => onCompleted(id)}
            onDeleted={() => onDeleted(id)}
            changeCreatedTime={() => changeCreatedTime(id)}
            taskState={taskState}
            min={min}
            sec={sec}
            timeCreatedFormat={timeCreatedFormat}
            startTimer={() => startTimer(id, taskState)}
            stopTimer={() => stopTimer(id)}
            stopCreatedTimeTimer={() => stopCreatedTimeTimer(id)}
          />
        </li>
      )
    }

    if (taskState === 'editing') {
      return (
        <li key={id} className={taskState}>
          <Task description={description} min={min} sec={sec} />
          <input type="text" className="edit" />
        </li>
      )
    }
    return (
      <li key={id} className={taskState}>
        <Task
          description={description}
          onCompleted={() => onCompleted(id)}
          onDeleted={() => onDeleted(id)}
          changeCreatedTime={() => changeCreatedTime(id)}
          taskState={taskState}
          min={min}
          sec={sec}
          timeCreatedFormat={timeCreatedFormat}
          stopTimer={() => stopTimer(id)}
          stopCreatedTimeTimer={() => stopCreatedTimeTimer(id)}
        />
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
