import React, { useState, useEffect }  from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const EditBatch = () => {
    const navigate = useNavigate();
    const [batchCode, setBatchCode] = useState('');
    const [batchName, setBatchName] = useState('');
    const [ID, setID] = useState(null);

    useEffect(() => {
        let usr = sessionStorage.getItem("username");
        if (usr == null) {
          navigate('/');
        }
        else {
            setBatchCode(localStorage.getItem('batchCode'));
            setBatchName(localStorage.getItem('batchName'));
          setID(localStorage.getItem('ID'));
        }
      }, [])
    
      const sendDataToAPI = () => {
        const batchData = {
          "_id": ID,
          "batchCode": batchCode,
          "batchName": batchName
        };
    
        axios.put('http://localhost:8062/api/batch', batchData)
          .then(() => {
            navigate('/batch');
          })
      }
  return (
    <>
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="place-holder">

          <Header as='h3'>Edit Batch</Header>
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

export default EditBatch
