import React,  { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LearnerDashboard = () => {
  const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8062/api/learner')
        .then((getData) => {
          console.log(JSON.stringify(getData));
          if(getData.data.status=='OK')
          {
          console.log(JSON.stringify(getData.data.data));
          setApiData(getData.data.data);
          }
        })
        .catch(error =>{
          console.log(error);
          console.log(error.message);
        })
    }, [])

  return (
    <>
    <Topbar/>
    <div className="container">
<Sidebar/>
<div className="place-holder">
<Header as='h3'>
              <Icon name='th' />
              <Header.Content>
                Learner Dashboard
              </Header.Content>
            </Header>
<Segment>
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

export default LearnerDashboard