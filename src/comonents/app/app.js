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
    }
    const { todoData } = this.state
    this.copy = JSON.stringify(todoData)
  }

  addTask = (text) => {
    const newItem = this.createTask(text)
    this.setState(() => {
      this.copy = JSON.stringify([...JSON.parse(this.copy), newItem])
      return {
        todoData: JSON.parse(this.copy),
      }
    })
  }

  taskComplete = (id) => {
    this.setState(() => {
      const copy = JSON.parse(this.copy)
      const inx = copy.findIndex((el) => el.id === id)
      const arr = [...copy]
      arr[inx].taskState = arr[inx].taskState === 'completed' ? 'active' : 'completed'
      this.copy = JSON.stringify(arr)
      return {
        todoData: JSON.parse(this.copy),
      }
    })
  }

  taskDeleted = (id) => {
    this.setState(() => {
      const copy = JSON.parse(this.copy)
      const inx = copy.findIndex((el) => el.id === id)
      this.copy = JSON.stringify([...copy.slice(0, inx), ...copy.slice(inx + 1)])
      return {
        todoData: JSON.parse(this.copy),
      }
    })
  }

  taskFilter = (buttonType) => {
    this.setState(() => {
      const realCopy = JSON.parse(this.copy)
      let result = realCopy
      if (buttonType === 'completed') {
        result = realCopy.filter((item) => item.taskState === 'completed')
      }
      if (buttonType === 'active') {
        result = realCopy.filter((item) => item.taskState === 'active')
      }
      return {
        todoData: result,
      }
    })
  }

  clearCompleted = () => {
    this.setState(() => {
      const copy = JSON.parse(this.copy)
      const result = copy.filter((item) => item.taskState !== 'completed')
      this.copy = JSON.stringify(result)
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
    const todoLength = JSON.parse(this.copy).filter((item) => item.taskState !== 'completed').length
    const { todoData } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={(text) => this.addTask(text)} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onCompleted={(id) => this.taskComplete(id)}
            onDeleted={(id) => this.taskDeleted(id)}
          />
          <Footer length={todoLength} Filtered={this.taskFilter} Cleared={this.clearCompleted} />
        </section>
      </section>
    )
  }
}
