import React, { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const Batch = () => {
  const [apiData, setApiData] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));
  useEffect(() => {
    const headers = {
      "x-access-token": token
    }
    axios.get('http://localhost:8062/api/batch', {
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
    }
    axios.get('http://localhost:8062/api/batch', {
      headers: headers
    })
      .then((getData) => {
        setApiData(getData.data.data);
      })
  }

  const onDelete = (id) => {
    const headers = {
      "x-access-token": token
    }
    axios.delete(`http://localhost:8062/api/batch/${id}`, {
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
                Batch Settings
                <Header.Subheader>Manage your Batches</Header.Subheader>
              </Header.Content>
            </Header>

            <Segment>
              <Button size='mini' color='grey'>
                <Link to='/newbatch' style={{ color: '#FFF' }}>Add New</Link>
              </Button>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Batch Code</Table.HeaderCell>
                    <Table.HeaderCell>Batch Name</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {apiData.map((data) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{data.batchCode}</Table.Cell>
                        <Table.Cell>{data.batchName}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/editbatch/${data._id}`}>
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

export default Batch