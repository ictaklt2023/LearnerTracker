import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'

const NewProject = () => {
    const navigate = useNavigate();
    const [projectCode, setProjectCode] = useState('');
    const [projectName, setProjectName] = useState('');

    const sendDataToAPI = () => {
        const projectData = {
          "projectCode": projectCode,
          "projectName": projectName
        };
    
        axios.post('http://localhost:8062/api/project', projectData)
          .then(() => {
            navigate('/project');
          })
      }

  return (
    <>
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="place-holder">

          <Header as='h3'>New Project</Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Project Code</label>
                <input required name='projectcode' value={projectCode} placeholder='Project Code' onChange={(e) => setProjectCode(e.target.value)} />
              </Form.Field>

              <Form.Field>
                <label>Project Name</label>
                <input required name='projectname' value={projectName} placeholder='Project Name' onChange={(e) => setProjectName(e.target.value)} />
              </Form.Field>

              <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

              <Button size='mini' color='grey'>
                <Link to='/project' style={{ color: '#FFF' }}>Cancel</Link>
              </Button>
            </Form>
          </Segment>
        </div>
      </div>
    </div>
  </>
  )
}

export default NewProject