/* eslint-disable indent */
import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import './app.css'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

export default class App extends React.Component {
  maxId = 1

  timers = []

  createdTimeTimers = []

  constructor(props) {
    super(props)
    this.state = {
      todoData: [this.createTask('Написать todo', 768, 41)],
      // eslint-disable-next-line react/no-unused-state
      filter: 'all',
    }
  }

  addTask = (text, min, sec) => {
    const newItem = this.createTask(text, min, sec)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  taskComplete = (id) => {
    this.setState(({ todoData }) => {
      const inx = todoData.findIndex((el) => el.id === id)
      const arr = [...todoData]
      arr[inx].taskState = arr[inx].taskState === 'completed' ? 'active' : 'completed'
      return {
        todoData: arr,
      }
    })
  }

  taskDeleted = (id) => {
    this.setState(({ todoData }) => {
      const inx = todoData.findIndex((el) => el.id === id)
      return {
        todoData: [...todoData.slice(0, inx), ...todoData.slice(inx + 1)],
      }
    })
  }

  taskFilter = () => {
    const { filter, todoData } = this.state
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

  setFilter = (buttonType) => {
    switch (buttonType) {
      case 'all':
        this.setState({
          filter: 'all',
        })
        break
      case 'active':
        this.setState({
          filter: 'active',
        })
        break
      case 'completed':
        this.setState({
          filter: 'completed',
        })
        break
      default:
        this.setState({
          filter: 'all',
        })
    }
  }

  stopCreatedTimeTimer = (id) => {
    clearInterval(this.createdTimeTimers[id])
    this.createdTimeTimers[id] = undefined
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      let result = [...todoData]
      result.forEach((item) => {
        const key = item.id
        if (this.createdTimeTimers[key]) {
          this.stopCreatedTimeTimer(key)
        }
      })
      result = result.filter((item) => item.taskState !== 'completed')
      return {
        todoData: result,
      }
    })
  }

  changeCreatedTime = (id) => {
    if (this.createdTimeTimers[id]) return
    this.createdTimeTimers[id] = setInterval(
      () => {
        this.setState(({ todoData }) => {
          const inx = todoData.findIndex((el) => el.id === id)
          const arr = [...todoData]
          arr[inx].timeCreatedFormat = formatDistanceToNow(arr[inx].timeCreated, {
            includeSeconds: true,
          })

          return {
            todoData: arr,
          }
        })
      },
      // eslint-disable-next-line comma-dangle
      5000
    )
  }

  startTimer = (id, taskState) => {
    if (taskState !== 'active' || this.timers[id]) return

    this.timers[id] = setInterval(() => {
      this.setState(({ todoData }) => {
        const inx = todoData.findIndex((el) => el.id === id)
        const arr = [...todoData]

        if (arr[inx].sec === 59) {
          arr[inx].sec = '00'
          arr[inx].min += 1
        } else if (+arr[inx].sec < 9) {
          arr[inx].sec = `0${+arr[inx].sec + 1}`
        } else {
          arr[inx].sec = +arr[inx].sec + 1
        }

        return {
          todoData: arr,
        }
      })
    }, 1000)
  }

  stopTimer = (id) => {
    clearInterval(this.timers[id])
    this.timers[id] = undefined
  }

  createTask(description, min, sec) {
    const temporaryId = this.maxId
    this.maxId += 1
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

  render() {
    const { todoData } = this.state
    const todoLength = todoData.filter((item) => item.taskState !== 'completed').length
    const todoDataFiltered = this.taskFilter()
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todoDataFiltered}
            onCompleted={this.taskComplete}
            onDeleted={this.taskDeleted}
            changeCreatedTime={this.changeCreatedTime}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            stopCreatedTimeTimer={this.stopCreatedTimeTimer}
          />
          <Footer length={todoLength} setFilter={this.setFilter} Cleared={this.clearCompleted} />
        </section>
      </section>
    )
  }
}
