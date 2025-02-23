export interface User {
    id: number;
    username: string;
    password: string;
  }
  
  export interface UserInput {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: number;
      username: string;
    };
  }
  
  export interface JwtPayload {
    userId: number;
    username: string;
  }