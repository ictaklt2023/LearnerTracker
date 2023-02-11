import React, { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const Batch = () => {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8062/api/batch')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data.data)
          })
      }, [])
    
      const setData = (id, batchCode, batchName) => {
        localStorage.setItem('ID', id);
        localStorage.setItem('batchCode', batchCode);
        localStorage.setItem('batchName', batchName);
      }
    
      //To Reload data after delete
      const getData = () => {
        axios.get('http://localhost:8062/api/batch')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data.data);
          })
      }
    
      const onDelete = (id) => {
        axios.delete(`http://localhost:8062/api/batch/${id}`)
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
                          <Link to='/editbatch'>
                            <Button size='mini' color='green' onClick={() => setData(data._id, data.batchCode, data.batchName)}>Edit</Button>
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