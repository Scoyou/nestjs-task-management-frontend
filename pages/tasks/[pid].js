import { useRouter } from 'next/router'
import Task from "../../components/Task";

const TaskShowPage = ({ task }) => {
  const router = useRouter()

  return <Task task={task} />
}

export default TaskShowPage