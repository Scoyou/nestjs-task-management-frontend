import React, { useState, } from "react";
import {
  Button,
  Modal,
  Form,
  TextArea,
} from "semantic-ui-react";
import axios from 'axios'

import ProjectDropdown from './ProjectsDropdown'
import SetPriorityDropdown from './SetPriorityDropdown'

const CreateTaskPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async (title, project, priority, description, status) => {
    const res = await axios({
      method: "post",
      url: 'http://localhost:3001/tasks',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2MDUyMjQwODQsImV4cCI6MTYwNTgyODg4NH0.Sd9caewp8iU-zHh03dEGeD2dkxnDDJuDxgb1xd5Gg1I`,
      },
      data: {
        description: description,
        title: title,
        project: project,
        priority: priority,
        status: status
      },
    }).then(() => {
      setTitle("")
      setProject("")
      setDescription("")
      setPriority("")
      setOpen(false)
      props.refetch()
    });
  };


  const handleSubmit = (title, project, priority, description, status) => (e) => {
    e.preventDefault();
    createTask(title, project, priority, description, status)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Create Task</Button>}
    >
      <Modal.Header>Create new task</Modal.Header>
      <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Project</label>
              <ProjectDropdown setProject={setProject}/>
            </Form.Field>
            <Form.Field>
              <label>Priority</label>
              <SetPriorityDropdown setPriority={setPriority} />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea 
              value={description} 
              style={{ minHeight: 400 }} 
              onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Field>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit(title, project, priority, description)} type="submit">Submit</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default CreateTaskPage;
