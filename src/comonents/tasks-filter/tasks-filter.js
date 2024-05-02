import React from 'react';
import PropTypes from 'prop-types';

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

TasksFilter.defaultProps = {
  onFiltered: () => {},
};

TasksFilter.propTypes = {
  onFiltered: PropTypes.func,
};

export default TasksFilter;
