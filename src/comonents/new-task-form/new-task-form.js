import React, { useState } from 'react'
import './new-task-form.css'

export default function NewTaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmit = () => {
    if (taskName && !Number.isNaN(min) && min >= 0 && !Number.isNaN(sec) && sec >= 0 && sec < 60) {
      const minTrunced = min < 10 ? `0${Math.trunc(min)}` : Math.trunc(min)
      const secTrunced = sec < 10 ? `0${Math.trunc(sec)}` : Math.trunc(sec)
      onAdd(taskName, minTrunced, secTrunced)
      setTaskName('')
      setMin('')
      setSec('')
    }
  }

  const onChange = ({ target }) => {
    const { name } = target
    if (name === 'taskName') {
      setTaskName(target.value)
    } else if (name === 'min') {
      setMin(target.value)
    } else {
      setSec(target.value)
    }
  }

  return (
    <form className="new-todo-form">
      <input
        name="taskName"
        className="new-todo"
        value={taskName}
        placeholder="Task"
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
      />
      <input
        name="min"
        className="new-todo-form__timer"
        value={min}
        placeholder="Min"
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
      />
      <input
        name="sec"
        className="new-todo-form__timer"
        value={sec}
        placeholder="Sec"
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
      />
    </form>
  )
}
