import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";

const updateTaskStatus = async (id, taskStatus) => {
  const res = await axios({
    method: "patch",
    url: `http://localhost:3001/tasks/${id}/status`,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUxMzAxODMsImV4cCI6MTYwNTczNDk4M30.xR581PfgGwYPVnpxhFbKB2Stx0z6Um-ofJ_3h-6DIHA`,
    },
    data: {
      status: taskStatus,
    },
  });
};

const TaskStatusDropdown = ({ task }) => {
  const options = [
    { key: 1, label: "OPEN", value: "OPEN" },
    { key: 2, label: "IN PROGRESS", value: "IN_PROGRESS" },
    { key: 3, label: "DONE", value: "DONE" },
  ];

  const handleChange = (taskId) => (e) => {
    updateTaskStatus(taskId, e.value);
  };

  return (
    <div>
      <Select
        value={task.status}
        placeholder={task.status}
        options={options}
        onChange={handleChange(task.id)}
      />
    </div>
  );
};

export default TaskStatusDropdown;
