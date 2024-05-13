import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

function Footer({ length, setFilter, Cleared }) {
  const lengthSpace = `${length} `
  return (
    <footer className="footer">
      <span className="todo-count">
        {lengthSpace}
        items left
      </span>
      <TasksFilter setFilter={setFilter} />
      <button type="button" className="clear-completed" onClick={() => Cleared()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  length: 0,
  setFilter: () => {},
  Cleared: () => {},
}

Footer.propTypes = {
  length: PropTypes.number,
  setFilter: PropTypes.func,
  Cleared: PropTypes.func,
}

export default Footer
