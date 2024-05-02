import React from 'react';
import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({ length, onFiltered, onCleared}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {length}
        {' '}
        items left
      </span>
      <TasksFilter onFiltered={onFiltered} />
      <button className="clear-completed" onClick={() => onCleared()}>Clear completed</button>
    </footer>
  );
}

export default Footer;
