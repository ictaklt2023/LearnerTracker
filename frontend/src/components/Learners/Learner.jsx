import React, { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'
import axios from 'axios';

const Learner = () => {
  const [apiData, setApiData] = useState([]);
  const [placementVisible, setPlacementVisible] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  useEffect(() => {
    let usrtype = sessionStorage.getItem("usertype");
    if (usrtype === 'Placement Officer') {
      setPlacementVisible(true)
    }

    const headers = {
      "x-access-token": token
    }
    axios.get('http://localhost:8062/api/learner', {
      headers: headers
    })
      .then((getData) => {
        if (getData.data.status == 'OK') {
          setApiData(getData.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  //To Reload data after delete
  const getData = () => {
    const headers = {
      "x-access-token": token
    }
    axios.get('http://localhost:8062/api/learner', {
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
    axios.delete(`http://localhost:8062/api/learner/${id}`, {
      headers: headers
    })
      .then(() => {
        getData();
      })
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="place-holder">
          <Header as='h3'>
            <Icon name='settings' />
            <Header.Content>
              Learners Settings
              <Header.Subheader>Manage your Learners</Header.Subheader>
            </Header.Content>
          </Header>
          <Segment>
            {!placementVisible && <><Button size='mini' color='grey'>
              <Link to='/newlearner' style={{ color: '#FFF' }}>Add New</Link>
            </Button></>}
            {!placementVisible && <><Button size='mini' color='grey'>
              <Link to='/bulkupload' style={{ color: '#FFF' }}>CSV Upload</Link>
            </Button></>}
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Learner Id</Table.HeaderCell>
                  <Table.HeaderCell>Learner Name</Table.HeaderCell>
                  <Table.HeaderCell>Course</Table.HeaderCell>
                  <Table.HeaderCell>Project</Table.HeaderCell>
                  <Table.HeaderCell>Batch</Table.HeaderCell>
                  <Table.HeaderCell>Course Status</Table.HeaderCell>
                  <Table.HeaderCell>Placement Status</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  {!placementVisible && <><Table.HeaderCell></Table.HeaderCell></>}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {apiData.map((data) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{data.learnerId}</Table.Cell>
                      <Table.Cell>{data.learnerName}</Table.Cell>
                      <Table.Cell>{data.courseName}</Table.Cell>
                      <Table.Cell>{data.project}</Table.Cell>
                      <Table.Cell>{data.batch}</Table.Cell>
                      <Table.Cell>{data.courseStatus}</Table.Cell>
                      <Table.Cell>{data.placementStatus}</Table.Cell>

                      {!placementVisible && <><Table.Cell>
                        <Link to={`/editlearner/${data._id}`}>
                          <Button size='mini' color='green'>Edit</Button>
                        </Link>
                      </Table.Cell></>}

                      {placementVisible && <Table.Cell>
                        <Link to={`/updateplacement/${data._id}`}>
                          <Button size='mini' color='green'>Update Placement</Button>
                        </Link>
                      </Table.Cell>}

                      {!placementVisible && <><Table.Cell>
                        <Button size='mini' color='red' onClick={() => onDelete(data._id)}>Delete</Button>
                      </Table.Cell></>}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Segment>
        </div>
      </div>
    </>
  )
}

export default Learner