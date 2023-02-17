import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { json, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const EditBatch = () => {
  const navigate = useNavigate();
  const [batchCode, setBatchCode] = useState('');
  const [batchName, setBatchName] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  const { id } = useParams();

  useEffect(() => {
    const headers  = {
      "x-access-token": token
    }
    axios
      .get(`http://localhost:8062/api/batch/${id}`,{
        headers: headers
      })
      .then((res) => {
        setBatchCode(res.data.data.batchCode);
        setBatchName(res.data.data.batchName);
      })
      .catch((err) => {
        console.log('Error from Get Batch Details');
      });
  }, []);

  const sendDataToAPI = () => {
    const batchData = {
      "_id": id,
      "batchCode": batchCode,
      "batchName": batchName
    };
    const headers  = {
      "x-access-token": token
    };

    axios.put('http://localhost:8062/api/batch', batchData,{
      headers: headers
    })
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
                  <input required name='batchCode' value={batchCode} placeholder='Batch Code' onChange={(e) => setBatchCode(e.target.value)} />
                </Form.Field>

                <Form.Field>
                  <label>Batch Name</label>
                  <input required name='batchName' value={batchName} placeholder='CouBatchrse Name' onChange={(e) => setBatchName(e.target.value)} />
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
