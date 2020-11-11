import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import Task from "../../components/Task";
import { Tab, Input } from "semantic-ui-react";

const fetchTasks = async (key) => {
  const res = await fetch(`http://localhost:3001/tasks`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
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
  
  const { resolvedData, latestData, status } = usePaginatedQuery(
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
      <Input
        placeholder="Search for a task"
        value={searchTerm}
        onChange={handleChange}
      />
    
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
