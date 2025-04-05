export interface Task {
    id: number
    title: string
    description?: string
    isComplete: boolean
    createdAt: string
  }
  
  export interface CreateTaskInput {
    title: string
    description?: string
  }
  
  export interface UpdateTaskInput {
    title?: string
    description?: string
    isComplete?: boolean
  }

  export interface UpdateTaskParams {
    id: number;
    data: UpdateTaskInput;
  }