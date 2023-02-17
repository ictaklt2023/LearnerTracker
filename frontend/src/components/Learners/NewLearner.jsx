import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'

const courseStatusOptions = [
  {
    key: 'Qualified',
    text: 'Qualified',
    value: 'Qualified'
  },
  {
    key: 'Incompetent',
    text: 'Incompetent',
    value: 'Incompetent'
  }
]

const placementStatusOptions = [
  {
    key: 'Job Seeking',
    text: 'Job Seeking',
    value: 'Job Seeking'
  },
  {
    key: 'Placed',
    text: 'Placed',
    value: 'Placed'
  },
  {
    key: 'NOT Interested',
    text: 'NOT Interested',
    value: 'NOT Interested'
  }
]

const NewLearner = () => {
  const navigate = useNavigate();
  const [courseItems, setCourseItems] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [batchItems, setBatchItems] = useState([]);

  const [learnerId, setLearnerId] = useState('');
  const [learnerName, setLearnerName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [project, setProject] = useState('');
  const [batch, setBatch] = useState('');
  const [courseStatus, setCourseStatus] = useState('');
  const [placementStatus, setPlacementStatus] = useState('');
  const [theadvisible, setTheadVisible] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  useEffect(() => {
    let usrtype = sessionStorage.getItem("usertype");
    if (usrtype === 'Training Head') {
      setTheadVisible(false)
    }
    const headers = {
      "x-access-token": token
    }
    axios.get('http://localhost:8062/api/course', {
      headers: headers
    })
      .then((getCourses) => {
        setCourseItems(getCourses.data.data);
      })

    axios.get('http://localhost:8062/api/project', {
      headers: headers
    })
      .then((getProjects) => {
        setProjectItems(getProjects.data.data);
      })

    axios.get('http://localhost:8062/api/batch', {
      headers: headers
    })
      .then((getBatches) => {
        setBatchItems(getBatches.data.data);
        console.log(getBatches.data.data)
      })
  }, [])

  const sendDataToAPI = () => {
    var isOk = true;
    if (courseName.length <= 0 || project.length <= 0 || batch.length <= 0 || courseStatus.length <= 0) {
      alert('Missing value for required field(s)');
      isOk = false;
    }
    if (isOk) {
      const LearnersData = {
        "learnerId": learnerId,
        "learnerName": learnerName,
        "courseName": courseName,
        "project": project,
        "batch": batch,
        "courseStatus": courseStatus,
        "placementStatus": placementStatus
      };
      const headers = {
        "x-access-token": token
      }
      axios.post('http://localhost:8062/api/learner', LearnersData, {
        headers: headers
      })
        .then((getData) => {
          if (getData.data.status === 'OK') {
            navigate('/learner');
          }
          else if (getData.data.status === 'Error') {
            alert(getData.data.message)
          }
        })
        .catch(error => {
          console.log('catch-err' + error);
        })
    }
  }

  return (
    <>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="place-holder">

            <Header as='h3'>New Learner</Header>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Learner ID</label>
                  <input required name='learnerId' value={learnerId} placeholder='Learner ID' onChange={(e) => setLearnerId(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Learner Name</label>
                  <input required name='learnerName' value={learnerName} placeholder='Learner Name' onChange={(e) => setLearnerName(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Course</label>
                  <Dropdown required placeholder='Select Course' fluid selection options={courseItems.map(ds => {
                    return {
                      key: ds.courseCode,
                      text: ds.courseName,
                      value: ds.courseName
                    }
                  })} value={courseName} onChange={(e, data) => setCourseName(data.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Project</label>
                  <Dropdown placeholder='Select Project' fluid selection options={projectItems.map(ds => {
                    return {
                      key: ds.projectCode,
                      text: ds.projectName,
                      value: ds.projectName
                    }
                  })} value={project} onChange={(e, data) => setProject(data.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Batch</label>
                  <Dropdown placeholder='Select Batch' fluid selection options={batchItems.map(ds => {
                    return {
                      key: ds.batchCode,
                      text: ds.batchName,
                      value: ds.batchName
                    }
                  })} value={batch} onChange={(e, data) => setBatch(data.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Course Status</label>
                  <Dropdown placeholder='Select Course Status' fluid selection options={courseStatusOptions} value={courseStatus} onChange={(e, data) => setCourseStatus(data.value)} />
                </Form.Field>

                {theadvisible && <> <Form.Field>
                  <label>Placement Status</label>
                  <Dropdown placeholder='Select Placement Status' fluid selection options={placementStatusOptions} value={placementStatus} onChange={(e, data) => setPlacementStatus(data.value)} />
                </Form.Field></>}



                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

                <Button size='mini' color='grey'>
                  <Link to='/learner' style={{ color: '#FFF' }}>Cancel</Link>
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewLearner