import React from "react";
import { Grid } from "semantic-ui-react";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TaskPriorityDropdown from "./TaskPriorityDropdown";
import TaskStatusDropdown from "./TaskStatusDropdown";
import CommentsIndex from './CommentsIndex'

const Task = ({ task }) => {
  return (
    <>
    <ProjectBreadcrumb project={task.projectIdentifier} task={task.title}/>
    <div style={{ width: "100%", borderStyle: "groove", height: '100%', display: 'flex' }}>        
      <Grid style={{flex: '1'}}>
        <Grid.Row>
          <Grid.Column width={10}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <CommentsIndex key={task.id} task={task} />
          </Grid.Column>
          <Grid.Column style={{ backgroundColor: "#add8e6" }} width={4}>
            <p>Project: {task.projectIdentifier}</p>
            <p>Assignee: {task.userId}</p>
            <TaskStatusDropdown task={task}/>
            <TaskPriorityDropdown task={task} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    </>
  );
};

export default Task;
