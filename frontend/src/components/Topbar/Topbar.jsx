import React from 'react'
import './Topbar.css'
import { Icon, Label, Menu, Table, Button, Segment, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
  const navigate = useNavigate();

  const getUserName = () => {
   
    let usr = sessionStorage.getItem("username");
    if (usr == null) {
      navigate('/');
    }
    else {
      let usrtype = sessionStorage.getItem("usertype");
      return 'Welcome ' + usr + ' | ' + usrtype;
    }
  }

  const logout = () => {
    //Removing username from sesstion storage
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("usertype");
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