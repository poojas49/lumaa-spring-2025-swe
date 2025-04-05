export interface User {
    id: number
    username: string
  }
  
  export interface AuthResponse {
    token: string
    user: User
  }
  
  export interface LoginInput {
    username: string
    password: string
  }
  
  export interface RegisterInput extends LoginInput {}