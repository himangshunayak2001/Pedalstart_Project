import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  const saveToLocaleStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }

  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id)
    setTodo(t[0].todo)
    handleDelete(e, id)
    saveToLocaleStorage()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocaleStorage()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocaleStorage()
  }

  const handleChange = (e) => {
    let data = e.target.value
    setTodo(data)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  return (
    <>
      <Navbar />
      <div className=' md:container mx-3 md:mx-auto my-2 bg-violet-200 p-5  rounded-xl min-h-[80vh] w-1/2'>
      <h1 className='text-center text-xl '>Lets Create your task</h1>
        <div className='my-5 flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>ADD A TASK</h2>

          <input type="text"
            onChange={handleChange}
            value={todo}
            className='w-full px-2 rounded-lg py-2'
            name="" id="" />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className='bg-cyan-200 disabled:bg-cyan-500 hover:text-white hover:bg-blue-500  p-3 py-1 text-gray-800 rounded-md'>Add</button>
        </div>
        <br />
        <input type="checkbox" onChange={toggleFinished} name="" checked={showFinished} id="" /> Show Finished
        <h2 className='text-lg font-semibold'>
          TASKS
        </h2>
        <div>
          {todos.length === 0 && <div> No tasks to display </div>}
          {
            todos.map((item) => {
              return (showFinished || !item.isCompleted) && (
                <div key={item.id} className='flex   my-3 mt-5 justify-between'>
                  <input type="checkbox"
                    name={item.id}
                    onChange={handleCheckbox}
                    checked={item.isCompleted} id="" />
                  <div className={`mx-5 text-wrap ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                  <div className='flex h-full'>
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className='bg-cyan-200 hover:bg-green-400 hover:text-white mx-6 p-3 py-1 text-gray-800 rounded-md'>EDIT</button>
                    <button
                      onClick={(e) => { handleDelete(e, item.id) }}
                      className='bg-cyan-200 hover:bg-red-400 hover:text-white mx-6 p-3 py-1 text-gray-800 rounded-md'>DELETE</button>
                  </div>
                </div>
              )

            })
          }

        </div>
      </div>
    </>


  )
}

export default App


