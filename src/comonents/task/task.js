import React from 'react';

import './task.css';

function Task({
  description, created, onCompleted, onDeleted,
}) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label onClick={onCompleted}>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit" />
      <button className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
}

export default Task;
