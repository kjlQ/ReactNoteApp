
import React,{ useState , useRef , useEffect } from 'react';
import TodoList from './TodoList'
import uuid from 'uuid/dist/v4'
import './App.css'

const LOCAL_KEY_APLIC = "todoApp"

export default function App(e) {
  const [todos, setTodos] = useState ([])
  const todoNameRef = useRef()
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_KEY_APLIC))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_APLIC,JSON.stringify(todos))
  }, [todos])
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }
  function handleAddName () {
    const name = todoNameRef.current.value
    if (name === '') return
    todoNameRef.current.value = null
    setTodos(prevTodos => {
      return [...prevTodos , {id:uuid() , name: name , complete:false}]
    })
  }
  function all() {
    setTodos(todos.map(todo=> {
      return {id:todo.id , name : todo.name ,complete:true}
    }))
  }
  function unall() {
    setTodos(todos.map(todo => {
      return {id:todo.id,name:todo.name,complete:false}
    }))
  }
  function clearTodo() {
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }
  return (
      <div className={"wid"}>
        <div className={"functionality"}>
          <p>{todos.filter(todos=>!todos.complete).length} todo left</p>
          <form>
            <input type="text" ref={todoNameRef}/>
            <button onClick={handleAddName}>Add todo</button>
          </form>
        </div>
        <div className="buttons">
          <button onClick={clearTodo}>Clear</button>
          <button onClick={all}>Mark all</button>
          <button onClick={unall}>Unmark all</button>
        </div>
        <div className="todoList">
          <div className="todos">
            All todo list :
            <TodoList todos = {todos} toggleTodo={toggleTodo} />
          </div>
        </div>
      </div>
  );
}

