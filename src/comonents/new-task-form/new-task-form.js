import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.input);
    this.setState({
      input: '',
    });
  };

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input className="new-todo" value={this.state.input} placeholder="What needs to be done?" autoFocus onChange={this.onChange} />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};
