import React, { useState } from "react";
import { Grid, Button, Container, Divider } from "semantic-ui-react";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TaskPriorityDropdown from "./TaskPriorityDropdown";
import TaskStatusDropdown from "./TaskStatusDropdown";
import CommentsIndex from "./CommentsIndex";
import Cookies from "js-cookie";
import api from "../services/api";

const Task = ({ task, refetch }) => {
  const [editing, setEditing] = useState(false);

  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const deleteTask = async (id) => {
    const res = await api.delete(`tasks/${id}`).then((res) => {
      refetch();
    });
  };

  return (
    <>
      <ProjectBreadcrumb project={task.projectIdentifier} task={task.title} />
      <div
        style={{
          width: "100%",
          borderStyle: "groove",
          height: "100%",
          display: "flex",
        }}
      >
        <Grid style={{ flex: "1" }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <h2>{task.title}</h2>
              <Divider />
              <p>
                <strong>Description:</strong>
              </p>
              <Container
                textAlign="justified"
                dangerouslySetInnerHTML={{ __html: task.description }}
                style={{ minHeight: "250px" }}
              ></Container>

              <CommentsIndex key={task.id} task={task} />
            </Grid.Column>
            <Grid.Column style={{ backgroundColor: "#add8e6" }} width={4}>
              <p>Project: {task.projectIdentifier}</p>
              <p>Assignee: {task.userId}</p>
              <TaskStatusDropdown task={task} refetch={refetch} />
              <TaskPriorityDropdown task={task} refetch={refetch} />

              <Divider />
              <h3>Danger Zone</h3>
              <Button negative onClick={() => deleteTask(task.id)}>
                Delete Task
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default Task;
