import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

class TasksFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: 'all',
    }
  }

  render() {
    const { Filtered } = this.props
    const { checked } = this.state

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
              Filtered('all')
              this.setState({
                checked: 'all',
              })
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
              Filtered('active')
              this.setState({
                checked: 'active',
              })
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
              Filtered('completed')
              this.setState({
                checked: 'completed',
              })
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.defaultProps = {
  Filtered: () => {},
}

TasksFilter.propTypes = {
  Filtered: PropTypes.func,
}

export default TasksFilter
