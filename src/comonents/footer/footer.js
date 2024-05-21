import React from 'react'

import TasksFilter from '../tasks-filter'

import './footer.css'

export default function Footer({ length, setFilter, Cleared }) {
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
