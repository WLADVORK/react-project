import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

import './footer.css'

function Footer({ length, Filtered, Cleared }) {
  const lengthSpace = `${length} `
  return (
    <footer className="footer">
      <span className="todo-count">
        {lengthSpace}
        items left
      </span>
      <TasksFilter Filtered={Filtered} />
      <button type="button" className="clear-completed" onClick={() => Cleared()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  length: 0,
  Filtered: () => {},
  Cleared: () => {},
}

Footer.propTypes = {
  length: PropTypes.number,
  Filtered: PropTypes.func,
  Cleared: PropTypes.func,
}

export default Footer
