import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const NewCourse = () => {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    let usr = sessionStorage.getItem("username");
    if (usr == null) {
      navigate('/');
    }
  }, [])

  const sendDataToAPI = () => {
    const courseData = {
      "courseCode": courseCode,
      "courseName": courseName
    };

    axios.post('http://localhost:8062/api/course', courseData)
      .then((getData) => {
        if (getData.data.status === 'OK') {
          navigate('/course');
        }
        else if (getData.data.status === 'Error') {
          alert(getData.data.message)
        }
      })
  }

  return (
    <>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="place-holder">

            <Header as='h3'>New Course</Header>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Course Code</label>
                  <input required name='coursecode' value={courseCode} placeholder='Course Code' onChange={(e) => setCourseCode(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Course Name</label>
                  <input required name='coursename' value={courseName} placeholder='Course Name' onChange={(e) => setCourseName(e.target.value)} />
                </Form.Field>

                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

                <Button size='mini' color='grey'>
                  <Link to='/course' style={{ color: '#FFF' }}>Cancel</Link>
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewCourse