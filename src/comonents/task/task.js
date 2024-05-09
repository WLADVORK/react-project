/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import './task.css'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends React.Component {
  timeCreated = new Date()

  constructor(props) {
    super(props)
    this.state = {
      time: formatDistanceToNow(this.timeCreated, { includeSeconds: true }),
      taskState: props.taskState,
      checked: props.taskState !== 'active',
    }
  }

  render() {
    const { onCompleted, description, onDeleted } = this.props
    const { time, checked } = this.state
    setInterval(() => {
      this.setState({
        time: formatDistanceToNow(this.timeCreated, { includeSeconds: true }),
      })
    }, 5000)
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => {
            onCompleted()
            this.setState(({ taskState }) => {
              let obj
              if (taskState === 'active') {
                obj = {
                  checked: true,
                  taskState: 'completed',
                }
              }
              if (taskState === 'completed') {
                obj = {
                  checked: false,
                  taskState: 'active',
                }
              }
              return obj
            })
          }}
          checked={checked}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{time}</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    )
  }
}

Task.defaultProps = {
  description: 'error',
  onCompleted: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  description: PropTypes.string,
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
}
