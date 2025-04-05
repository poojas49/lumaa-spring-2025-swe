import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CreateTaskInput, Task } from '../types/task'
import styles from '../styles/Task.module.css'

interface TaskFormProps {
  onSubmit: (values: CreateTaskInput) => Promise<void>
  initialValues?: Task
  onCancel?: () => void
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string()
})

const TaskForm = ({ onSubmit, initialValues, onCancel }: TaskFormProps) => {
  const formik = useFormik<CreateTaskInput>({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await onSubmit(values)
        resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title && (
          <div className={styles.error}>{formik.errors.title}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description && (
          <div className={styles.error}>{formik.errors.description}</div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {initialValues ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm