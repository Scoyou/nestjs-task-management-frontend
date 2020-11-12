import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";



const TaskPriorityDropdown = ({ task }) => {
    const [priority, setPriority] = useState(task.priority);
  const options = [
    { key: 1, label: "CRITICAL", value: "CRITICAL" },
    { key: 2, label: "PRESSING", value: "PRESSING" },
    { key: 3, label: "MAINTENANCE", value: "MAINTENANCE" },
  ];

  const updateTaskPriority = async (id, taskPriority) => {
    const res = await axios({
      method: "patch",
      url: `http://localhost:3001/tasks/${id}/priority`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUxMzAxODMsImV4cCI6MTYwNTczNDk4M30.xR581PfgGwYPVnpxhFbKB2Stx0z6Um-ofJ_3h-6DIHA`,
      },
      data: {
        priority: taskPriority,
      },
    }).then(res => setPriority(res.data.priority));
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
