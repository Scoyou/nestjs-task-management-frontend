import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Cookies from 'js-cookie'



const TaskStatusDropdown = ({ task, refetch }) => {
    const [status, setStatus] = useState(task.status);
  const options = [
    { key: 1, label: "OPEN", value: "OPEN" },
    { key: 2, label: "IN PROGRESS", value: "IN_PROGRESS" },
    { key: 3, label: "DONE", value: "DONE" },
  ];

  const updateTaskStatus = async (id, taskStatus) => {
    const jwt  = Cookies.get('jwt')
    const res = await axios({
      method: "patch",
      url: `http://localhost:3001/tasks/${id}/status`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        status: taskStatus,
      },
    }).then(res => {
      setStatus(res.data.status);
      refetch()
    });
  };

  const handleChange = (taskId) => (e) => {
    updateTaskStatus(taskId, e.value);
  };

  return (
    <div>
      <Select
        value={status}
        placeholder={status}
        options={options}
        onChange={handleChange(task.id)}
      />
    </div>
  );
};

export default TaskStatusDropdown;
