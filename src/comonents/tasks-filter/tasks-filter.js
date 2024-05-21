import React, { useState } from 'react'

import './tasks-filter.css'

export default function TasksFilter({ setFilter }) {
  const [checked, setChecked] = useState('all')

  let all = ''
  let active = ''
  let completed = ''
  if (checked === 'all') {
    all = 'selected'
  } else if (checked === 'active') {
    active = 'selected'
  } else {
    completed = 'selected'
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={all}
          onClick={() => {
            setFilter('all')
            setChecked('all')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={active}
          type="button"
          onClick={() => {
            setFilter('active')
            setChecked('active')
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={completed}
          onClick={() => {
            setFilter('completed')
            setChecked('completed')
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
