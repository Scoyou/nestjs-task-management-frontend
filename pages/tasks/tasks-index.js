import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
// import Task from "../../components/Task";
import CreateTaskPage from '../../components/CreateTask'
import Task from '../../components/Task'

import { Tab, Input } from "semantic-ui-react";

const fetchTasks = async (key) => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUxMzAxODMsImV4cCI6MTYwNTczNDk4M30.xR581PfgGwYPVnpxhFbKB2Stx0z6Um-ofJ_3h-6DIHA`,
    },
  });
  return res.json();
};

const TasksIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const { resolvedData, latestData, status, refetch } = usePaginatedQuery(
    ["tasks"],
    fetchTasks
  );

  const noSearchPanes =
    resolvedData &&
    resolvedData.map((task) => ({
      menuItem: `${task.title}`,
      render: () => <Task key={task.id} task={task} />,
    }));

  const searchPanes =
    searchResults &&
    searchResults.map((task) => ({
      menuItem: `${task.title}`,
      render: () => <Task key={task.id} task={task} />,
    }));

  useEffect(() => {
    let re = new RegExp(`${searchTerm}.*`, "g");
    const results =
      resolvedData && resolvedData.filter((data) => data.title.match(re));

    setSearchResults(results);
  }, [searchTerm, resolvedData, setSearchResults]);

  return (
    <div>
      <div>
      <Input
        placeholder="Search for a task"
        value={searchTerm}
        onChange={handleChange}
      />
      <CreateTaskPage refetch={refetch}/>
      </div>
    
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <Tab
            menu={{ fluid: true, vertical: true, tabular: true }}
            panes={searchResults ? searchPanes : noSearchPanes}
          />
        </>
      )}
    </div>
  );
};

export default TasksIndex;
