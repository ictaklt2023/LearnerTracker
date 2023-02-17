import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const Project = () => {
  const [apiData, setApiData] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  useEffect(() => {
    const headers = {
      "x-access-token": token
    };
    axios.get('http://localhost:8062/api/project', {
      headers: headers
    })
      .then((getData) => {
        setApiData(getData.data.data);
      })
  }, [])

  //To Reload data after delete
  const getData = () => {
    const headers = {
      "x-access-token": token
    };
    axios.get('http://localhost:8062/api/project', {
      headers: headers
    })
      .then((getData) => {
        setApiData(getData.data.data);
      })
  }

  const onDelete = (id) => {
    const headers = {
      "x-access-token": token
    };
    axios.delete(`http://localhost:8062/api/project/${id}`, {
      headers: headers
    })
      .then(() => {
        getData();
      })
  }

  return (
    <>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="place-holder">

            <Header as='h3'>
              <Icon name='settings' />
              <Header.Content>
                Project Settings
                <Header.Subheader>Manage your Projects</Header.Subheader>
              </Header.Content>
            </Header>

            <Segment>
              <Button size='mini' color='grey'>
                <Link to='/newproject' style={{ color: '#FFF' }}>Add New</Link>
              </Button>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Project Code</Table.HeaderCell>
                    <Table.HeaderCell>Project Name</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {apiData.map((data) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{data.projectCode}</Table.Cell>
                        <Table.Cell>{data.projectName}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/editproject/${data._id}`}>
                            <Button size='mini' color='green'>Edit</Button>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Button size='mini' color='red' onClick={() => onDelete(data._id)}>Delete</Button>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </Segment>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project