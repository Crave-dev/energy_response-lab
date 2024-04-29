'use client'

import { useMemo, useState } from "react"
import { useTodo } from "../hooks/todo"

type FilterType = 'DEFAULT' | 'COMPLETED' | 'INCOMPLETED'
function TodoList() {
  const [filterType, setFilterType] = useState<FilterType>('DEFAULT')
  const { todos, toggleCompleted, deleteItem } = useTodo()
  console.log(filterType, 't')
  const todosFiltered = useMemo(() => {
    if (filterType === 'INCOMPLETED') {
      return todos?.data?.filter((todo) => !todo.completed)
    }
    if (filterType === 'COMPLETED') {
      return todos?.data?.filter((todo) => todo.completed)
    }
    return todos?.data
  }, [filterType, todos])

  return <section className="py-6">
    <div className="flex justify-end">
      <label htmlFor="filter">Filter by:</label>
      <select name="filter" id="filter" defaultValue='default' onChange={(e) => {
        setFilterType(e.target.value as FilterType)
      }}>
        <option value="DEFAULT" defaultValue="DEFALT">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETED">Incompleted</option>
      </select>
    </div>
    <div className="flex flex-col gap-4 mt-2">
    {todosFiltered?.map((todo) => {
      return <div key={todo?.id} className="flex items-center rounded-xl shadow-lg p-4">
        <div className="flex-1">
          <span className="font-semibold text-lg">{todo?.title}</span>
          <pre>{todo?.description}</pre>
        </div>
       <div className="flex items-center gap-8">
        <button onClick={() => toggleCompleted(todo?.id)} className="w-12 h-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22.903" height="19.395" fill={todo?.completed ? 'green' : '#ccc'}><path d="M22.903 2.828 20.075 0 6.641 13.435 3.102 9.09 0 11.616l6.338 7.779L22.903 2.828z"/></svg>
        </button>
        {
          !todo?.completed ? <button onClick={() => deleteItem(todo?.id)} className="w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red"><g data-name="Trash"><path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.179A182.185 182.185 0 0 0 256 73.824zm-80.104 120.76c0-16.513 9.976-29.9 22.28-29.9h103.747c12.296 0 22.27 13.386 22.27 29.9v.467H175.897zm152.069 36.502-18.901 119.549a13.087 13.087 0 0 1-12.924 11.04h-92.184a13.084 13.084 0 0 1-12.92-11.04l-18.902-119.549a13.07 13.07 0 0 1 12.92-15.126h129.987a13.083 13.083 0 0 1 12.924 15.126z"/><path d="M250.05 343.939a7.486 7.486 0 0 1-7.48-7.48v-89.701a7.475 7.475 0 1 1 14.95 0v89.701a7.48 7.48 0 0 1-7.47 7.48zM212.718 343.939a7.476 7.476 0 0 1-7.436-6.83l-7.817-89.366a7.475 7.475 0 0 1 14.893-1.293l7.818 89.35a7.48 7.48 0 0 1-6.795 8.103c-.224.018-.443.036-.663.036zM286.42 343.939a8.34 8.34 0 0 1-.66-.036 7.477 7.477 0 0 1-6.794-8.103l7.813-89.35a7.472 7.472 0 0 1 14.888 1.293l-7.812 89.367a7.468 7.468 0 0 1-7.436 6.829z"/></g></svg>
          </button> : null
        }
       </div>
      </div>
    })}
    </div>
  </section>
}

export default TodoList