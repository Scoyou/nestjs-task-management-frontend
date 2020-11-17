import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import CreateTaskPage from "../../components/CreateTask";
import Task from "../../components/Task";

import { Tab, Input } from "semantic-ui-react";
import ProjectsDropdown from "../../components/ProjectsDropdown";
import Cookies from "js-cookie";
import api from '../../services/api'

const TasksIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [project, setProject] = useState("");
  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchTasks = async (key, project) => {
    const url =
      project === ""
        ? "http://localhost:3001/tasks"
        : `http://localhost:3001/tasks?projectIdentifier=${project}`;
    const res = await api.get(url)
    return res.data;
  };

  const { resolvedData, latestData, status, refetch } = usePaginatedQuery(
    ["tasks", project],
    fetchTasks
  );

  const noSearchPanes =
    resolvedData &&
    resolvedData.map((task) => ({
      menuItem: `${task.title}`,
      render: () => <Task key={task.id} task={task} refetch={refetch} />,
    }));

  const searchPanes =
    searchResults &&
    searchResults.map((task) => ({
      menuItem: `${task.title}`,
      render: () => <Task key={task.id} task={task} refetch={refetch} />,
    }));

  useEffect(() => {
    let re = new RegExp(`${searchTerm}.*`, "g");
    const results =
      resolvedData &&
      resolvedData.filter((data) => data.title.toLowerCase().match(re));

    setSearchResults(results);
  }, [searchTerm, resolvedData, setSearchResults]);

  return (
    <div>
      <div>
        Project: <ProjectsDropdown setProject={setProject} />
        <Input
          placeholder="Search for a task"
          value={searchTerm}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        />
        <CreateTaskPage refetch={refetch} />
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
