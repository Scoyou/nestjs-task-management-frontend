import React, { useState, } from "react";
import {
  Button,
  Modal,
  Form,
} from "semantic-ui-react";
import axios from 'axios'
import Cookies from 'js-cookie'


const SignInPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (username, password) => {
    const res = await axios({
      method: "post",
      url: 'http://localhost:3001/auth/signin',
      data: {
        username,
        password
      },
    }).then((res) => {
      Cookies.set('jwt', res.data.accessToken)
      props.setLoggedIn(true)
      setOpen(false)
    });
  };


  const handleSubmit = (username, password) => (e) => {
    e.preventDefault();
    login(username, password)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Login</Button>}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Field>
            <Form.Field type='password'>
              <label>Password</label>
              <input 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit(username, password)} type="submit">Submit</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default SignInPage;
