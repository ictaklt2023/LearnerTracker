import React from 'react'
import { useState } from 'react';
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const LoginValidate = () => {
    const userData = {
      "username": username,
      "password": password
    }
    console.log('username=' + userData.username);
    console.log('password=' + userData.password);
    axios.post('http://localhost:8062/api/user/login', userData)
      .then((getData) => {
        console.log('getData=' + JSON.stringify(getData));
        console.log('getData.data=' + JSON.stringify(getData.data));
        console.log('getData.data.status=' + JSON.stringify(getData.data.status));
        console.log('data=' + JSON.stringify(getData.data.data));
        if (getData.data.status === 'OK') {
          sessionStorage.setItem("username", getData.data.data[0].username);
          sessionStorage.setItem("usertype", getData.data.data[0].usertype);
          navigate('/dashboard');
        }
        else if (getData.data.status === 'Error')
        {
          alert(getData.data.message);
        }
      }
      )
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <div className="logo"><b>Learner Tracker Login</b></div>
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='User Name' name='username' onChange={(e) => setUsername(e.target.value)} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password' name='password' onChange={(e) => setPassword(e.target.value)}
            />

            <Button color='grey' fluid size='large' type='submit' onClick={LoginValidate}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login