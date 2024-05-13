/* eslint-disable indent */
import React from 'react'

import './app.css'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

export default class App extends React.Component {
  maxId = 1

  constructor(props) {
    super(props)
    this.state = {
      todoData: [this.createTask('Написать кривой код')],
      // eslint-disable-next-line react/no-unused-state
      filter: 'all',
    }
  }

  addTask = (text) => {
    const newItem = this.createTask(text)
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

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const result = todoData.filter((item) => item.taskState !== 'completed')
      return {
        todoData: result,
      }
    })
  }

  createTask(description) {
    const temporaryId = this.maxId
    this.maxId += 1
    return {
      description,
      taskState: 'active',
      id: temporaryId,
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
          <NewTaskForm onAdd={(text) => this.addTask(text)} />
        </header>
        <section className="main">
          <TaskList
            todos={todoDataFiltered}
            onCompleted={(id) => this.taskComplete(id)}
            onDeleted={(id) => this.taskDeleted(id)}
          />
          <Footer length={todoLength} setFilter={this.setFilter} Cleared={this.clearCompleted} />
        </section>
      </section>
    )
  }
}
