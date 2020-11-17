import React, { useState, } from "react";
import {
  Button,
  Modal,
  Form,
} from "semantic-ui-react";
import axios from 'axios'

const SignUpPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState("");

  const signUp = async (username, password) => {
    const res = await axios({
      method: "post",
      url: 'http://localhost:3001/auth/signup',
      data: {
        username,
        password
      },
    }).then(() => {
      setOpen(false)
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setErrors('')
    }).catch((e) => {
        setErrors(e.message)
    });
  };


  const handleSubmit = (username, password) => (e) => {
    e.preventDefault();
    if(confirmPassword === password) {
        signUp(username, password)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Sign Up</Button>}
    >
      <Modal.Header>Sign Up</Modal.Header>
      {errors && <p>{JSON.stringify(errors)}</p> }
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
            {confirmPassword === password ? 
            <>
            <p></p>
            </> :
            <p styles={{color: 'red'}}>Passwords do not match</p>}
            <Form.Field type='password'>
              <label>Confirm Password</label>
              <input 
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default SignUpPage;
