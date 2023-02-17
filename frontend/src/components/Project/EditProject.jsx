import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const EditProject = () => {
  const navigate = useNavigate();
  const [projectCode, setProjectCode] = useState('');
  const [projectName, setProjectName] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  const { id } = useParams();

  useEffect(() => {
    const headers = {
      "x-access-token": token
    }
    axios.get(`http://localhost:8062/api/project/${id}`, {
      headers: headers
    })
      .then((res) => {
        setProjectCode(res.data.data.projectCode);
        setProjectName(res.data.data.projectName);
      })
      .catch((err) => {
        console.log('Error from Get Project Details');
      });
  }, [])

  const sendDataToAPI = () => {
    const projectData = {
      "_id": id,
      "projectCode": projectCode,
      "projectName": projectName
    };

    const headers = {
      "x-access-token": token
    }
    axios.put('http://localhost:8062/api/project', projectData, {
      headers: headers
    })
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

            <Header as='h3'>Edit Project</Header>
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

export default EditProject