import React, { useEffect } from 'react'
import './Topbar.css'
import { Icon, Label, Menu, Table, Button, Segment, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Topbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("usertoken");
    const tokenData = {
      "token": token
    }
    axios.post('http://localhost:8062/api/user/check-login-status',
      tokenData
    ).then((response) => {
      if (response.data.message == "Unauthorized User") {
        navigate('/');
      }
    })
  })

  // useEffect(() => {
  //   let token = sessionStorage.getItem("usertoken");
  //   const tokenData = {
  //     "token": token
  //   }
  //   axios.post('http://localhost:8062/api/user/check-login-status', { headers: {"x-access-token" : `${token}`} }
  //   ).then((response) => {
  //     console.log('response='+response);
  //     console.log('response.data='+response.data);
  //     console.log('response.data.message='+response.data.message);
  //     if (response.data.message == "Unauthorized User") {
  //       navigate('/');
  //     }
  //   })
  // })

  // useEffect(() => {
  //   let token = sessionStorage.getItem("usertoken");
  //   console.log('token-topbar='+token);
  //   const headers  = {
  //     "x-access-token": token
  //   }
  //   axios.post('http://localhost:8062/api/user/check-login-status', {
  //     headers: headers
  //   }
  //   ).then((response) => {
  //     console.log('response='+response);
  //     console.log('response.data='+response.data);
  //     console.log('response.data.message='+response.data.message);
  //     if (response.data.message == "Unauthorized User") {
  //       navigate('/');
  //     }
  //   })
  //   .catch(err => {
  //     // Handle error
  //     console.log(err);
  //     console.log(err.response.data.message);
  //     if(err.response.data.message =="Forbidden Access")
  //     {
  //       navigate('/');
  //     }
  // });
  // })

  const getUserName = () => {
    let usr = sessionStorage.getItem("username");
    let usrtype = sessionStorage.getItem("usertype");
    return 'Welcome ' + usr + ' | ' + usrtype;
  }

  const logout = () => {
    //Removing username from sesstion storage
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("usertype");
    sessionStorage.removeItem("usertoken");
    navigate('/');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Learner Tracker</span>
        </div>
        <div className="topRight">
          <Label><Icon name='user' /><strong>{getUserName()}</strong></Label>
          <Button size='mini' color='grey' onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Topbar