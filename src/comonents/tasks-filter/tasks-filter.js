import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

function TasksFilter({ Filtered }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className="selected" onClick={() => Filtered('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={() => Filtered('active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={() => Filtered('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  Filtered: () => {},
}

TasksFilter.propTypes = {
  Filtered: PropTypes.func,
}

export default TasksFilter
