'use client'

import { useLocalStorage } from "@uidotdev/usehooks";
import { uuidv7 } from "uuidv7";

const TODO_KEY = 'todo'

export interface TodoItem {
  id: string
  title: string
  description: string | null
  completed: boolean
}

export function useTodo() {
  const [todos, setTodo] = useLocalStorage<{ data: TodoItem[] }>(TODO_KEY, { data: [{
    title: 'Example',
    description: 'example description.',
    completed: true,
    id: uuidv7()
  }] })

  const createTodo = (todo: Omit<TodoItem, 'id'>) => {
    setTodo((prevTodo) => {
      return { data: [...prevTodo?.data, { ...todo, id: uuidv7() }]}
    })
  }

  const toggleCompleted = (id: string) => {
    setTodo((prevTodo => {
      const target = prevTodo.data?.find((todo) => todo.id === id)
      if (target) {
        if (target.completed) {
          target.completed = false
        } else {
          target.completed = true
        }
      }
      return prevTodo
    }))
  }

  const deleteItem = (id: string) => {
    setTodo((prevTodo) => {
      const newTodo = prevTodo?.data?.filter(todo => todo.id !== id)
      return { data: newTodo }
    })
  }

  return {
    createTodo,
    toggleCompleted,
    deleteItem,
    todos,
  }
}