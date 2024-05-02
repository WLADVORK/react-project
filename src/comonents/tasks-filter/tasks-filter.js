import React from 'react';

import './tasks-filter.css';

function TasksFilter({ onFiltered }) {
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={() => onFiltered('all')}>All</button>
      </li>
      <li>
        <button onClick={() => onFiltered('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => onFiltered('completed')}>Completed</button>
      </li>
    </ul>
  );
}

export default TasksFilter;
