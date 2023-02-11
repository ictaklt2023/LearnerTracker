import React,{ useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const Project = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8062/api/project')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data.data)
          })
      }, [])

      const setData = (id, projectCode, projectName) => {
        localStorage.setItem('ID', id);
        localStorage.setItem('projectCode', projectCode);
        localStorage.setItem('projectName', projectName);
      }

      //To Reload data after delete
  const getData = () => {
    axios.get('http://localhost:8062/api/project')
      .then((getData) => {
        setApiData(getData.data.data);
        console.log(getData.data.data);
      })
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:8062/api/project/${id}`)
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
                        <Link to='/editproject'>
                          <Button size='mini' color='green' onClick={() => setData(data._id, data.projectCode, data.projectName)}>Edit</Button>
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