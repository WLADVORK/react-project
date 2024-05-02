import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({ length, onFiltered, onCleared }) {
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

Footer.defaultProps = {
  length: 0,
  onFiltered: () => {},
  onCleared: () => {},
};

Footer.propTypes = {
  length: PropTypes.number,
  onFiltered: PropTypes.func,
  onCleared: PropTypes.func,
};

export default Footer;
