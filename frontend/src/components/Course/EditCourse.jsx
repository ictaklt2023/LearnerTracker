import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const EditCourse = () => {
  const navigate = useNavigate();
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  const { id } = useParams();

  useEffect(() => {
    const headers = {
      "x-access-token": token
    }
    axios
      .get(`http://localhost:8062/api/course/${id}`, {
        headers: headers
      })
      .then((res) => {
        setCourseCode(res.data.data.courseCode);
        setCourseName(res.data.data.courseName);
      })
      .catch((err) => {
        console.log('Error from Get Course Details');
      });
  }, []);

  const sendDataToAPI = () => {
    const courseData = {
      "_id": id,
      "courseCode": courseCode,
      "courseName": courseName
    };
    const headers = {
      "x-access-token": token
    };

    axios.put('http://localhost:8062/api/course', courseData, {
      headers: headers
    })
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

export default EditCourse