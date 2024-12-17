'use server'

import { revalidatePath } from "next/cache"
import { validateFormData } from "@/utils/task.validation.utils"
import { Task } from '@/types/task.type'

if (!process.env.API_URL) {
  throw new Error("API_URL environment variable is required")
}

const BACKEND_URL = `${process.env.API_URL}`

export async function getAllTasks() {
  const res = await fetch(`${BACKEND_URL}/task`)
  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }
  return res.json()
}

export async function createTask(prevState: null, formData: FormData) {
  try {
    const data = await validateFormData(formData)
    const res = await fetch(`${BACKEND_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      return { message: 'Failed to create task' }
    }

    revalidatePath("/")
    return { message: 'success' }
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}

export async function updateTask(prevState: null, formData: FormData) {
  try {
    const data = await validateFormData(formData)
    const id = formData.get('id')

    if (!id) {
      return { message: 'Task ID is required' }
    }

    const res = await fetch(`${BACKEND_URL}/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      return { message: 'Failed to update task' }
    }

    revalidatePath("/")
    return { message: 'success' }
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}

export async function toggleTaskComplete(task: Task): Promise<Task> {
  const res = await fetch(`${BACKEND_URL}/task/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: task.completed }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle task complete");
  }

  revalidatePath("/")
  return res.json();
}

export async function deleteTask(prevState: null, formData: FormData) {
  const id = formData.get('id')

  if (!id) {
    return { message: 'Task ID is required' }
  }

  const res = await fetch(`${BACKEND_URL}/task/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    return { message: 'Failed to delete task' }
  }

  revalidatePath("/")
}

