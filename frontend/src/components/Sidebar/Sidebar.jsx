import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import {
  LineStyle,
  Dashboard
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [adminvisible, setAdminVisible] = useState(false);

  useEffect(() => {
    let usr = sessionStorage.getItem("username");
   
    if (usr == null) {
      navigate('/');
    }
    else
    {
      let usrtype = sessionStorage.getItem("usertype");
      if(usrtype==='Admin')
      {
        setAdminVisible(true)
      }
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        <div className="sidebarMenu">
          <h4 className="sidebarTitle">Dashboard</h4>
          <ul className="sidebarList">

          <Link to="/dashboard" className="link">
            <li className="sidebarListItem">
              <Dashboard className="sidebarIcon" />
              Learner Dashboard
            </li>
            </Link>
          

          </ul>
        </div>

        <div className="sidebarMenu">
          <h4 className="sidebarTitle">Settings</h4>
          <ul className="sidebarList">

<Link to="/learner" className="link">
          <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Learner
            </li>
            </Link>



            {adminvisible && <><Link to="/course" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Course
            </li>
            </Link></>}

            {adminvisible && <><Link to="/project" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Project
            </li>
            </Link></>}

            {adminvisible && <><Link to="/batch" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Batch
            </li>
            </Link></>}

            {adminvisible && <><Link to="/user" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              User
            </li>
            </Link></>}
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar