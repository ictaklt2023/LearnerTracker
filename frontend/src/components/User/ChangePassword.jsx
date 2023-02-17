import React,{ useState, useEffect } from 'react'
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
    const { id } = useParams();
    const [token, setToken] = useState(sessionStorage.getItem("usertoken"));

  useEffect(() => {
    const headers  = {
      "x-access-token": token
    };
    axios
    .get(`http://localhost:8062/api/user/${id}`,{
      headers: headers
    })
    .then((res) => {
      setUsername(res.data.data.username);
      setUsertype(res.data.data.usertype);
    })
    .catch((err) => {
      console.log('Error from Get User Details');
    });
  }, [])

  const sendDataToAPI = () => {
    const userData = {
        "_id": id,
       "password": password
    };
    const headers  = {
      "x-access-token": token
    };

    axios.put('http://localhost:8062/api/user/password', userData,{
      headers: headers
    })
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