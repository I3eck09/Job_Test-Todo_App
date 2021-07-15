import React, { useState, useEffect } from 'react'
import './todoStyle.css'

const TodoList = () => {

  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem('todos')

    if (saveTodos) {
      return JSON.parse(saveTodos)
    } else {
      return []
    }
  })
  const [todo, setTodo] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState({})

  const handleEditInputChange = (event) => {
    setCurrentTodo({ ...currentTodo, text: event.target.value })
  }

  const handleInputChange = (event) => {
    setTodo(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (todo !== '') {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        }
      ])
    }
    setTodo('')
  }

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem)
  }

  const handleEditClick = (todo) => {
    setIsEditing(true)
    setCurrentTodo({ ...todo })
  }

  const handleUpdateTodo = (id, updateTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo
    })

    setIsEditing(false)
    setTodos(updatedItem)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    handleUpdateTodo(currentTodo.id, currentTodo)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='container'>
      <div className='TodoList-form'>
        <div className='header'>
          Todo List
        </div>
        {isEditing ? (
          <form onSubmit={handleEditFormSubmit}>
            <input
              type='text'
              className='edit-todo'
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />
            <button className='btn-update' type='submit'>Update</button>
            <button className='btn-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              type='text'
              className='input-todo'
              value={todo}
              onChange={handleInputChange}
            />
            <button className='btn-add' type='submit'>Add</button>
          </form>
        )}
        <div className='content'>
          {todos.map((todo, index) => (
            <div className='todo-item'>
              <div className='todo-name'>
                <li>{todo.text}</li>
              </div>
              <div className='todo-action'>
                <button className='btn-edit' onClick={() => handleEditClick(todo)}>Edit</button>
                <button className='btn-delete' onClick={() => handleDeleteClick(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList