import React,{ useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const User = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8062/api/user')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data.data)
          })
      }, [])

      const setData = (id, username, usertype) => {
        localStorage.setItem('ID', id);
        localStorage.setItem('username', username);
        localStorage.setItem('usertype', usertype);
      }

      const getData = () => {
        axios.get('http://localhost:8062/api/user')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data.data);
          })
      }
    
      const onDelete = (id) => {
        axios.delete(`http://localhost:8062/api/user/${id}`)
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
              User Settings
              <Header.Subheader>Manage your Users</Header.Subheader>
            </Header.Content>
          </Header>

          <Segment>
            <Button size='mini' color='grey'>
              <Link to='/newuser' style={{ color: '#FFF' }}>Add New</Link>
            </Button>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User Name</Table.HeaderCell>
                  <Table.HeaderCell>User Type</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {apiData.map((data) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{data.username}</Table.Cell>
                      <Table.Cell>{data.usertype}</Table.Cell>
                      <Table.Cell>
                        <Link to='/edituser'>
                          <Button size='mini' color='green' onClick={() => setData(data._id, data.username, data.usertype)}>Edit User Type</Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to='/changepassword'>
                          <Button size='mini' color='green' onClick={() => setData(data._id, data.username, data.usertype)}>Change Password</Button>
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

export default User