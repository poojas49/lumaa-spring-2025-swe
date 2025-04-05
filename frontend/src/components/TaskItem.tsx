import { Task } from '../types/task'
import styles from '../styles/Task.module.css'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => void
  onToggleComplete: (task: Task) => void
}

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) => {
  return (
    <div className={`${styles.taskItem} ${task.isComplete ? styles.completed : ''}`}>
      <div className={styles.taskContent}>
        <div className={styles.taskTitle}>{task.title}</div>
        {task.description && (
          <div className={styles.taskDescription}>{task.description}</div>
        )}
      </div>
      <div className={styles.taskActions}>
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onToggleComplete(task)}
        />
        <button
          className={`${styles.button} ${styles.editButton}`}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem