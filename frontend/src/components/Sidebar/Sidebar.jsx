import "./Sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Dashboard,
  Work
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
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



            <Link to="/course" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Course
            </li>
            </Link>

            <Link to="/project" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Project
            </li>
            </Link>

            <Link to="/batch" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Batch
            </li>
            </Link>

            <Link to="/user" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              User
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar