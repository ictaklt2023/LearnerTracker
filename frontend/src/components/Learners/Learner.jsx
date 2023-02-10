import React,  { useEffect, useState } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'
import axios from 'axios';

const Learner = () => {
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

      const setData = (id, learnerId, learnerName,courseName,project,batch,courseStatus,placementStatus) => {
        localStorage.setItem('ID', id);
        localStorage.setItem('learnerId', learnerId);
        localStorage.setItem('learnerName', learnerName);
        localStorage.setItem('courseName', courseName);
        localStorage.setItem('project', project);
        localStorage.setItem('batch', batch);
        localStorage.setItem('courseStatus', courseStatus);
        localStorage.setItem('placementStatus', placementStatus);
      }

      const getData = () => {
        axios.get('http://localhost:8062/api/learner')
          .then((getData) => {
            setApiData(getData.data.data);
            console.log(getData.data);
          })
      }
    
      const onDelete = (id) => {
        axios.delete(`http://localhost:8062/api/learner/${id}`)
          .then(() => {
            getData();
          })
      }
    
    //   const getUserName = () => {
    //     return sessionStorage.getItem("username");
    //   }

  return (
    <>
    <Topbar/>
    <div className="container">
<Sidebar/>
<div className="place-holder">
<Header as='h3'>
              <Icon name='settings' />
              <Header.Content>
                Learners Settings
                <Header.Subheader>Manage your Learners</Header.Subheader>
              </Header.Content>
            </Header>
<Segment>
      <Button size='mini' color='grey'>
        <Link to='/newlearner' style={{ color: '#FFF' }}>Add New</Link>
      </Button>
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
            <Table.HeaderCell></Table.HeaderCell>
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
                <Table.Cell>
                  <Link to='/editlearner'>
                    <Button size='mini' color='green' onClick={() => setData(data._id, data.learnerId, data.learnerName, data.courseName, data.project, data.batch, data.courseStatus, data.placementStatus)}>Edit</Button>
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
    </>
  )
}

export default Learner