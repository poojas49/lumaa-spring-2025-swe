import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LoginInput } from '../types/auth'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Login.module.css'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
})

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')

  const formik = useFormik<LoginInput>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authApi.login(values)
        login(response.data.token, response.data.user)
        navigate('/tasks')
      } catch (err) {
        setError('Invalid username or password')
      }
    },
  })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username && (
              <div className={styles.error}>{formik.errors.username}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.button}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.registerLink}>
          <span>Don't have an account?</span>
          <button type="button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login