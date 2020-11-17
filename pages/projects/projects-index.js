import React from "react";
import { usePaginatedQuery } from "react-query";
import Cookies from "js-cookie";

import api from "../../services/api";
import Project from "../../components/Project";

const ProjectsIndex = () => {
  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const fetchProjects = async (key) => {
    const res = await api.get("projects");
    return res.data;
  };

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
