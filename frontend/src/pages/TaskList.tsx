// src/pages/TaskList.tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '../services/api'
import { CreateTaskInput, Task, UpdateTaskInput, UpdateTaskParams } from '../types/task'
import TaskItem from '../components/TaskItem'
import TaskForm from '../components/TaskForm'
import styles from '../styles/Task.module.css'

const TaskList = () => {
  const queryClient = useQueryClient()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch tasks
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await tasksApi.getTasks()
      return response.data
    }
  })

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (taskData: CreateTaskInput) => tasksApi.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setError(null)
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Error creating task')
    }
  })

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: UpdateTaskParams) => tasksApi.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setEditingTask(null)
      setError(null)
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Error updating task')
    }
  })

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setError(null)
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Error deleting task')
    }
  })

  const handleCreateTask = async (values: { title: string; description?: string }) => {
    try {
      await createTaskMutation.mutateAsync(values)
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  const handleToggleComplete = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { isComplete: !task.isComplete }
    })
  }

  if (isLoading) return <div className={styles.container}>Loading tasks...</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Tasks</h1>
      </div>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {editingTask ? (
        <TaskForm
          initialValues={editingTask}
          onSubmit={async (values) => {
            await updateTaskMutation.mutateAsync({
              id: editingTask.id,
              data: values
            })
          }}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm
          onSubmit={handleCreateTask}
        />
      )}

      <div className={styles.taskList}>
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={(id) => deleteTaskMutation.mutate(id)}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList