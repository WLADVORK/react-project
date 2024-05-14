/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskState: props.taskState,
      checked: props.taskState !== 'active',
    }
  }

  componentDidMount() {
    const { changeCreatedTime } = this.props
    changeCreatedTime()
  }

  render() {
    const { onCompleted, onDeleted, stopTimer, startTimer, stopCreatedTimeTimer } = this.props
    const { description, timeCreatedFormat, min, sec } = this.props
    const { checked } = this.state

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => {
            stopTimer()
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
          <span className="title">{description}</span>
          <span className="description">
            <button type="button" />
            <button type="button" className="icon icon-play" onClick={startTimer} />
            <button type="button" className="icon icon-pause" onClick={stopTimer} />
            <span className="description__time">{`${min}:${sec}`}</span>
          </span>
          <span className="description">{timeCreatedFormat}</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => {
            stopTimer()
            stopCreatedTimeTimer()
            onDeleted()
          }}
        />
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
