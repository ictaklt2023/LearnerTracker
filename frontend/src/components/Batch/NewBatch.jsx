import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';


const NewBatch = () => {
    const navigate = useNavigate();
    const [batchCode, setBatchCode] = useState('');
    const [batchName, setBatchName] = useState('');
  
    useEffect(() => {
      let usr = sessionStorage.getItem("username");
      if (usr == null) {
        navigate('/');
      }
    }, [])
  
    const sendDataToAPI = () => {
      const batchData = {
        "batchCode": batchCode,
        "batchName": batchName
      };
  
      axios.post('http://localhost:8062/api/batch', batchData)
        .then((getData) => {
          if (getData.data.status === 'OK') {
            navigate('/batch');
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

            <Header as='h3'>New Batch</Header>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Batch Code</label>
                  <input required name='batchcode' value={batchCode} placeholder='Course Code' onChange={(e) => setBatchCode(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Batch Name</label>
                  <input required name='batchname' value={batchName} placeholder='Course Name' onChange={(e) => setBatchName(e.target.value)} />
                </Form.Field>

                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

                <Button size='mini' color='grey'>
                  <Link to='/batch' style={{ color: '#FFF' }}>Cancel</Link>
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewBatch