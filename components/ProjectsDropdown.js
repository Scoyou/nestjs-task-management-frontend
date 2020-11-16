import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { usePaginatedQuery } from "react-query";

const fetchProjects = async (key) => {
  const res = await fetch(`http://localhost:3001/projects`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUxMzAxODMsImV4cCI6MTYwNTczNDk4M30.xR581PfgGwYPVnpxhFbKB2Stx0z6Um-ofJ_3h-6DIHA`,
    },
  });
  return res.json();
};


const ProjectsDropdown = (props) => {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["projects"],
    fetchProjects
  );

  const handleChange = (event, data) => {
    props.setProject(data.value)
  };

  const options = resolvedData && resolvedData.map((project) => ({
    key: project.id,
    text: project.identifier,
    value: project.identifier,
  }));

  return (
    <>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <Menu compact>
          <Dropdown 
          text={options.value} 
          options={options}
          onChange={handleChange}
          simple 
          value={options.value}
          item />
        </Menu>
      )}
    </>
  );
};

export default ProjectsDropdown;
