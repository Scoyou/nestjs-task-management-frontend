import React from "react";
import { usePaginatedQuery } from "react-query";

import Project from "../../components/Project";

const fetchProjects = async (key) => {
  const res = await fetch(`http://localhost:3001/projects`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUxMjUzNTksImV4cCI6MTYwNTEyODk1OX0.6XZOqO4VMSbqrOc1CNqJ4Yj4aykbPfHiVjgoIEiILs8`,
    },
  });
  return res.json();
};

const ProjectsIndex = () => {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["projects"],
    fetchProjects
  );

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <div>
            {resolvedData.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsIndex;