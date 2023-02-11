import React,{ useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const userTypeOptions = [
    {
      key: 'Admin',
      text: 'Admin',
      value: 'Admin'
    },
    {
      key: 'Training Head',
      text: 'Training Head',
      value: 'Training Head'
    },
    {
      key: 'Placement Officer',
      text: 'Placement Officer',
      value: 'Placement Officer'
    }
  ]

const EditUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
  const [ID, setID] = useState(null);

  useEffect(() => {
      setUsername(localStorage.getItem('username'));
      // setPassword(localStorage.getItem('password'));
      setUsertype(localStorage.getItem('usertype'));
      setID(localStorage.getItem('ID'));
  }, [])

  const sendDataToAPI = () => {
    var isOk=true;
    if(usertype.length<=0)
    {
alert('Usertype is required!');
isOk=false;
    }

    if(isOk)
    {
    const userData = {
        "_id": ID,
      // "username": username,
      // "password": password,
      "usertype": usertype
    };

    axios.put('http://localhost:8062/api/user/usertype', userData)
      .then((getData) => {
        if(getData.data.status==='OK')
        {
          navigate('/user');
        }
        else if(getData.data.status==='Error')
        {
          alert(getData.data.message)
        }
      })
      .catch(error =>{
        console.log('catch-err'+error);
        console.log('catch-err-message'+error.message);
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

            <Header as='h3'>Edit User Type</Header>
            <Segment>
              <Form>

             

                <Form.Field>
                  <label>User Name</label>
                  <Label as='a' basic size='large'>{username}</Label>
                  {/* <input required name='username' value={username} placeholder='User Name' onChange={(e) => setUsername(e.target.value)} /> */}
                </Form.Field>

                <Form.Field>
            <label>User Type</label>
            <Dropdown placeholder='Select User Type' fluid selection options={userTypeOptions} value={usertype} onChange={(e, data) => setUsertype(data.value)} />
          </Form.Field>

                {/* <Form.Field>
                  <label>Password</label>
                  <input required type='password' name='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Field> */}

                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

                <Button size='mini' color='grey'>
                  <Link to='/user' style={{ color: '#FFF' }}>Cancel</Link>
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser