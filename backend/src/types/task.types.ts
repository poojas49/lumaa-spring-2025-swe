export interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
    userId: number;
    createdAt: Date;
  }
  
  export interface CreateTaskInput {
    title: string;
    description?: string;
  }
  
  export interface UpdateTaskInput {
    title?: string;
    description?: string;
    isComplete?: boolean;
  }