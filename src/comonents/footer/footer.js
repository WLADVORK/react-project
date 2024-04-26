import React from 'react';
import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({ length }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {length}
        {' '}
        items left
      </span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default Footer;
