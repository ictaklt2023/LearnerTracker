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
    axios.post('http://localhost:8062/api/user/login', userData)
      .then((getData) => {
        if (getData.data.status === 'OK') {
          sessionStorage.setItem("username", getData.data.data[0].username);
          sessionStorage.setItem("usertype", getData.data.data[0].usertype);
          sessionStorage.setItem("usertoken", getData.data.token);
          navigate('/dashboard');
        }
        else if (getData.data.status === 'Error') {
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
        <Form size='large' onSubmit={LoginValidate}>
          <Segment stacked>
            <Form.Input required fluid icon='user' iconPosition='left' placeholder='User Name' name='username' onChange={(e) => setUsername(e.target.value)} 
           />
            <Form.Input
            required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password' name='password' onChange={(e) => setPassword(e.target.value)}
            />
             <Button color="grey" fluid size='large'>Login</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login