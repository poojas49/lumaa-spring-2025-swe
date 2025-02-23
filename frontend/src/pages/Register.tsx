import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Login.module.css'

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
})

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...registerData } = values
        const response = await authApi.register(registerData)
        login(response.data.token, response.data.user)
        navigate('/tasks')
      } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed')
      }
    },
  })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className={styles.error}>{formik.errors.confirmPassword}</div>
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.button}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className={styles.registerLink}>
          <span>Already have an account?</span>
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register