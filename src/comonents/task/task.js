/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import './task.css'

export default function Task({
  onCompleted,
  onDeleted,
  stopTimer,
  startTimer,
  changeCreatedTime,
  stopCreatedTimeTimer,
  taskState,
  description,
  timeCreatedFormat,
  min,
  sec,
}) {
  const [, setNewTaskState] = useState(taskState)
  const [checked, setChecked] = useState(taskState !== 'active')

  useEffect(() => {
    changeCreatedTime()
  }, [])

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onChange={() => {
          stopTimer()
          onCompleted()
          setNewTaskState((state) => {
            setChecked(() => {
              if (state === 'active') {
                return true
              }
              return false
            })
            if (state === 'active') {
              return 'completed'
            }
            return 'active'
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
