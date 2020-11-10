import React from "react";
import { usePaginatedQuery } from "react-query";
import Task from "../../components/Task";

const fetchTasks = async (key) => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    headers: {
      Authorization:
      `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  return res.json();
};

const TasksIndex = () => {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["tasks"],
    fetchTasks
  );

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <div>
            {resolvedData.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TasksIndex;
