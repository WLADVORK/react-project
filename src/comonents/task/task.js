import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  timeCreated = new Date();

  state = {
    time: formatDistanceToNow(this.timeCreated, { includeSeconds: true }),
  };

  render() {
    const { onCompleted, description, onDeleted } = this.props;
    setInterval(() => {
      this.setState({
        time: formatDistanceToNow(this.timeCreated, { includeSeconds: true }),
      });
    }, 5000);
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onCompleted} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{this.state.time}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}

Task.defaultProps = {
  description: 'error',
  onCompleted: () => {},
  onDeleted: () => {},
};

Task.propTypes = {
  description: PropTypes.string,
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
};
