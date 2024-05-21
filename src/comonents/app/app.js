/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './app.css'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'
// [createTask('Написать todo', 768, 41)]
export default function App() {
  const [filter, setFilters] = useState('all')
  const [maxId, setMaxId] = useState(1)
  const [todoData, setTodoData] = useState([])
  const [createdTimeTimers, setCreatedTimeTimers] = useState([])
  const [timers, setTimers] = useState([])

  function createTask(description, min, sec) {
    const temporaryId = maxId
    setMaxId((state) => state + 1)
    const createdDate = new Date()
    return {
      description,
      taskState: 'active',
      id: temporaryId,
      min,
      sec,
      timeCreated: createdDate,
      timeCreatedFormat: formatDistanceToNow(createdDate, { includeSeconds: true }),
    }
  }

  useEffect(() => {
    setTodoData([createTask('Написать todo', 768, 41)])
  }, [])

  const addTask = (text, min, sec) => {
    const newItem = createTask(text, min, sec)
    setTodoData((state) => [...state, newItem])
  }

  const taskComplete = (id) => {
    setTodoData((state) => {
      const inx = state.findIndex((el) => el.id === id)
      const arr = [...state]
      arr[inx].taskState = arr[inx].taskState === 'completed' ? 'active' : 'completed'
      return arr
    })
  }

  const taskDeleted = (id) => {
    setTodoData((state) => {
      const inx = state.findIndex((el) => el.id === id)
      return [...state.slice(0, inx), ...state.slice(inx + 1)]
    })
  }

  const taskFilter = () => {
    switch (filter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((item) => item.taskState === 'active')
      case 'completed':
        return todoData.filter((item) => item.taskState === 'completed')
      default:
        return todoData
    }
  }

  const setFilter = (buttonType) => {
    switch (buttonType) {
      case 'all':
        setFilters('all')
        break
      case 'active':
        setFilters('active')
        break
      case 'completed':
        setFilters('completed')
        break
      default:
        setFilters('all')
    }
  }

  const stopCreatedTimeTimer = (id) => {
    setCreatedTimeTimers((state) => {
      const arr = [...state]
      clearInterval(arr[id])
      arr[id] = undefined
      return arr
    })
  }

  const clearCompleted = () => {
    setTodoData((state) => {
      let result = [...state]
      result.forEach((item) => {
        const key = item.id
        if (createdTimeTimers[key]) {
          stopCreatedTimeTimer(key)
        }
      })
      result = result.filter((item) => item.taskState !== 'completed')
      return result
    })
  }

  const changeCreatedTime = (id) => {
    if (createdTimeTimers[id]) return
    createdTimeTimers[id] = setInterval(
      () => {
        setTodoData((state) => {
          const inx = state.findIndex((el) => el.id === id)
          const arr = [...state]
          arr[inx].timeCreatedFormat = formatDistanceToNow(arr[inx].timeCreated, {
            includeSeconds: true,
          })
          return arr
        })
      },
      // eslint-disable-next-line comma-dangle
      5000
    )
  }

  const startTimer = (id, taskState) => {
    if (taskState !== 'active' || timers[id]) return
    setTimers((states) => {
      const art = [...states]
      art[id] = setInterval(() => {
        setTodoData((state) => {
          const inx = state.findIndex((el) => el.id === id)
          const arr = [...state]

          if (arr[inx].sec === 59) {
            arr[inx].sec = '00'
            if (+arr[inx].min >= 9) {
              arr[inx].min = +arr[inx].min + 1
            } else {
              arr[inx].min = `0${+arr[inx].min + 1}`
            }
          } else if (+arr[inx].sec < 9) {
            arr[inx].sec = `0${+arr[inx].sec + 1}`
          } else {
            arr[inx].sec = +arr[inx].sec + 1
          }

          return arr
        })
      }, 1000)
      return art
    })
  }

  const stopTimer = (id) => {
    clearInterval(timers[id])
    timers[id] = undefined
  }

  const todoLength = todoData.filter((item) => item.taskState !== 'completed').length
  const todoDataFiltered = taskFilter()
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={todoDataFiltered}
          onCompleted={taskComplete}
          onDeleted={taskDeleted}
          changeCreatedTime={changeCreatedTime}
          startTimer={startTimer}
          stopTimer={stopTimer}
          stopCreatedTimeTimer={stopCreatedTimeTimer}
        />
        <Footer length={todoLength} setFilter={setFilter} Cleared={clearCompleted} />
      </section>
    </section>
  )
}
