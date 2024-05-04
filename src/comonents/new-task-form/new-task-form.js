import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onAdd } = this.props
    const { input } = this.state
    onAdd(input)
    this.setState({
      input: '',
    })
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  render() {
    const { input } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input className="new-todo" value={input} placeholder="What needs to be done?" onChange={this.onChange} />
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
