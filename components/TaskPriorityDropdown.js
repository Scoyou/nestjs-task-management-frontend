import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import Cookies from 'js-cookie'

const TaskPriorityDropdown = ({ task, refetch }) => {
  const [priority, setPriority] = useState(task.priority);
  const options = [
    { key: 1, label: "CRITICAL", value: "CRITICAL" },
    { key: 2, label: "PRESSING", value: "PRESSING" },
    { key: 3, label: "MAINTENANCE", value: "MAINTENANCE" },
  ];

  const updateTaskPriority = async (id, taskPriority) => {
    const jwt  = Cookies.get('jwt')
    const res = await axios({
      method: "patch",
      url: `http://localhost:3001/tasks/${id}/priority`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        priority: taskPriority,
      },
    }).then((res) => {
      setPriority(res.data.priority);
      refetch()
    });
  };

  const handleChange = (taskId) => (e) => {
    updateTaskPriority(taskId, e.value);
  };

  return (
    <div>
      <Select
        value={priority}
        placeholder={priority}
        options={options}
        onChange={handleChange(task.id)}
      />
    </div>
  );
};

export default TaskPriorityDropdown;
