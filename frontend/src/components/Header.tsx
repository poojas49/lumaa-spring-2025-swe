import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Task Manager</h1>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header