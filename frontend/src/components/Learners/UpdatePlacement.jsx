import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'

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

const UpdatePlacement = () => {
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
  const [pofcrvisible, setPofcrVisible] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  const { id } = useParams();

  useEffect(() => {
    let usrtype = sessionStorage.getItem("usertype");
    if (usrtype === 'Training Head') {
      setTheadVisible(false)
    }
    else if (usrtype == 'Placement Officer') {
      setPofcrVisible(false)
    }

    const headers = {
      "x-access-token": token
    };

    axios
      .get(`http://localhost:8062/api/learner/${id}`, {
        headers: headers
      })
      .then((res) => {
        setLearnerId(res.data.data.learnerId);
        setLearnerName(res.data.data.learnerName);
        setCourseName(res.data.data.courseName);
        setProject(res.data.data.project);
        setBatch(res.data.data.batch);
        setCourseStatus(res.data.data.courseStatus);
        setPlacementStatus(res.data.data.placementStatus);
      })
      .catch((err) => {
        console.log('Error from Get Learner Details');
      });
  }, [])

  const sendDataToAPI = () => {
    var isOk = true;
    if (courseName.length <= 0 || project.length <= 0 || batch.length <= 0 || courseStatus.length <= 0) {
      alert('Missing value for required field(s)');
      isOk = false;
    }
    if (isOk) {
      const LearnersData = {
        "_id": id,
        "placementStatus": placementStatus
      };

      const headers = {
        "x-access-token": token
      };
      axios.put('http://localhost:8062/api/learner/placementstatus', LearnersData, {
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

            <Header as='h3'>Update Placement Status</Header>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Learner ID</label>
                  <Label>{learnerId}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Learner Name</label>
                  <Label>{learnerName}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Course</label>
                  <Label>{courseName}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Project</label>
                  <Label>{project}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Batch</label>
                  <Label>{batch}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Course Status</label>
                  <Label>{courseStatus}</Label>
                </Form.Field>

                <Form.Field>
                  <label>Placement Status</label>
                  <Dropdown placeholder='Select Placement Status' fluid selection options={placementStatusOptions} value={placementStatus} onChange={(e, data) => setPlacementStatus(data.value)} />
                </Form.Field>


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

export default UpdatePlacement