import React from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      min: '',
      sec: '',
    }
  }

  onSubmit = () => {
    const { onAdd } = this.props
    const { taskName } = this.state
    let { min, sec } = this.state
    if (taskName && !Number.isNaN(min) && min >= 0 && !Number.isNaN(sec) && sec >= 0 && sec < 60) {
      min = min < 10 ? `0${Math.trunc(min)}` : Math.trunc(min)
      sec = sec < 10 ? `0${Math.trunc(sec)}` : Math.trunc(sec)
      onAdd(taskName, min, sec)
      this.setState({
        taskName: '',
        min: '',
        sec: '',
      })
    }
  }

  onChange = ({ target }) => {
    const { name } = target
    this.setState({
      [name]: target.value,
    })
  }

  render() {
    const { taskName, min, sec } = this.state
    return (
      <form className="new-todo-form">
        <input
          name="taskName"
          className="new-todo"
          value={taskName}
          placeholder="Task"
          onChange={this.onChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.onSubmit()
            }
          }}
        />
        <input
          name="min"
          className="new-todo-form__timer"
          value={min}
          placeholder="Min"
          onChange={this.onChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.onSubmit()
            }
          }}
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          value={sec}
          placeholder="Sec"
          onChange={this.onChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.onSubmit()
            }
          }}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
}
