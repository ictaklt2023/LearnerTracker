import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const EditCourse = () => {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [ID, setID] = useState(null);

  useEffect(() => {
    let usr = sessionStorage.getItem("username");
    if (usr == null) {
      navigate('/');
    }
    else {
      setCourseCode(localStorage.getItem('courseCode'));
      setCourseName(localStorage.getItem('courseName'));
      setID(localStorage.getItem('ID'));
    }
  }, [])

  const sendDataToAPI = () => {
    const courseData = {
      "_id": ID,
      "courseCode": courseCode,
      "courseName": courseName
    };

    axios.put('http://localhost:8062/api/course', courseData)
      .then(() => {
        navigate('/course');
      })
  }


  return (
    <>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="place-holder">

            <Header as='h3'>Edit Course</Header>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Course Code</label>
                  <input name='courcecode' value={courseCode} placeholder='Course Code' onChange={(e) => setCourseCode(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Course Name</label>
                  <input name='courcename' value={courseName} placeholder='Course Name' onChange={(e) => setCourseName(e.target.value)} />
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

export default EditCourse