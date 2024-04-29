'use client'

import { useFormStatus } from "react-dom"
import { useTodo } from "../hooks/todo"
import { ZodError, z } from "zod"
import { useRef } from "react"
import { useForm } from "react-hook-form"

const todoSchema = z.object({
  title: z.string().min(3),
  description: z.string().nullable(),
  completed: z.boolean()
})

function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const { createTodo } = useTodo()
  const { handleSubmit, register, reset } = useForm<{ title: string; description: string }>()

  const createTodoSubmit= (data: {
    title: string;
    description: string;
  }) => {
    try {
      const parseTodo = todoSchema.parse({
        title: data?.title,
        description: data?.description || null,
        completed: false
      })
      createTodo(parseTodo)
    } catch(err) {
      if (err instanceof ZodError) {
        alert(err?.errors?.[0]?.message) 
        return
      }
      alert('Fail to create todo!') 
    } finally {
      reset()
    }
  }

  return (
    <section className="grid place-content-center">
      <form ref={formRef} onSubmit={handleSubmit(createTodoSubmit)} className="grid grid-cols-1 gap-2 w-[40vw] max-w-[600px]">
        <label htmlFor="title" className="font-semibold text-3xl">Title<sup className="text-red-700">*</sup></label>
        <input type="text" {...register('title')} placeholder="Enter your title." className="border border-light-400 rounded-lg h-8 text-lg pl-1" />
        <label htmlFor="description" className="font-semibold text-3xl">Description</label>
        <textarea {...register('description')} className="border border-light-400 rounded-lg resize-none pl-1 text-lg" rows={5} placeholder="Enter your description." />
        <SubmitButton />
      </form>
    </section>
  )
}

function SubmitButton() {
  const {pending} = useFormStatus()

  return <button type='submit' disabled={pending} className="bg-green-500 rounded-2xl h-12 text-white">{pending ? 'Submitting' : 'Submit'}</button>
}

export default TodoForm