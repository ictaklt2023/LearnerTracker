import React,{ useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
  const [ID, setID] = useState(null);

  useEffect(() => {
      setUsername(localStorage.getItem('username'));
      setUsertype(localStorage.getItem('usertype'));
      setID(localStorage.getItem('ID'));
      console.log('usertype='+usertype);
      console.log('username='+username);
  }, [])

  const sendDataToAPI = () => {
    const userData = {
        "_id": ID,
       "password": password
    };

    axios.put('http://localhost:8062/api/user/password', userData)
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

  return (
    <>
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="place-holder">

          <Header as='h3'>Change Password</Header>
          <Segment>
            <Form>

           

              <Form.Field>
                <label>User Name</label>
                <Label as='a' basic size='large'>{username}</Label>
              </Form.Field>

               <Form.Field>
                <label>User Type</label>
                <Label as='a' basic size='large'>{usertype}</Label>
              </Form.Field>

             

              <Form.Field>
                <label>Password</label>
                <input required type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              </Form.Field>

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

export default ChangePassword