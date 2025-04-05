// src/services/api.ts
import axios from 'axios'
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task'
import { LoginInput, RegisterInput, AuthResponse } from '../types/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (data: LoginInput) => 
    api.post<AuthResponse>('/auth/login', data),
  
  register: (data: RegisterInput) => 
    api.post<AuthResponse>('/auth/register', data)
}

export const tasksApi = {
  getTasks: () => 
    api.get<Task[]>('/tasks'),
  
  createTask: (data: CreateTaskInput) => 
    api.post<Task>('/tasks', data),
  
  updateTask: (id: number, data: UpdateTaskInput) => 
    api.put<Task>(`/tasks/${id}`, data),
  
  deleteTask: (id: number) => 
    api.delete(`/tasks/${id}`)
}

export default api