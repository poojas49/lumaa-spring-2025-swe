# Full-Stack Task Management Application

A modern task management application built with React, TypeScript, Node.js, and PostgreSQL that allows users to register, log in, and manage their tasks seamlessly.

## 🚀 Features

- **User Authentication**
  - Secure registration and login with JWT
  - Protected routes with authentication middleware
  - Password encryption with bcrypt

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Task filtering and organization

- **Responsive UI**
  - Clean, intuitive interface
  - Mobile-friendly design

## 🛠️ Technologies

### Frontend
- React 19
- TypeScript
- React Router v7
- React Query for state management
- Formik for form handling
- Yup for validation
- CSS Modules for styling

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT for authentication
- Bcrypt for password hashing

## 📦 Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL

### Database Setup
1. Create a PostgreSQL database named `task_management`
2. Run the SQL scripts to create the necessary tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=3000
DB_USER=your_db_username
DB_HOST=localhost
DB_NAME=task_management
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:3000
```

4. Start the frontend development server:
```bash
npm run dev
```

## 💻 Usage

1. Register a new account or log in with existing credentials
2. Create, edit, and delete tasks
3. Mark tasks as complete or incomplete
4. Log out when finished

## 📸 Screenshots

![Login Screen](https://github.com/yourusername/task-management-app/raw/main/screenshots/login.png)
![Task Dashboard](https://github.com/yourusername/task-management-app/raw/main/screenshots/dashboard.png)

## 🔍 Project Structure

```
task-management/
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript type definitions
│   │   └── server.ts       # Express server setup
│   └── package.json
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── context/        # Context providers (Auth)
    │   ├── pages/          # Page components
    │   ├── services/       # API service layer
    │   ├── styles/         # CSS modules
    │   └── types/          # TypeScript interfaces
    └── package.json
```

## 🧪 Future Improvements

- Add task categories and tags
- Implement task search functionality
- Add user profile management
- Create due dates and reminders for tasks
- Add dark/light theme toggle
- Implement drag and drop for task reordering

## 👨‍💻 Author

[Pooja Shinde](https://github.com/poojas49)
