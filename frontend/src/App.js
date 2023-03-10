import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Course from './components/Course/Course';
import NewCourse from './components/Course/NewCourse';
import { Dashboard } from '@material-ui/icons';
import EditCourse from './components/Course/EditCourse';
import Learner from './components/Learners/Learner';
import NewLearner from './components/Learners/NewLearner';
import LearnerDashboard from './components/Dashboard/LearnerDashboard';
import EditLearner from './components/Learners/EditLearner';
import User from './components/User/User';
import NewUser from './components/User/NewUser';
import EditUser from './components/User/EditUser';
import Project from './components/Project/Project';
import NewProject from './components/Project/NewProject';
import EditProject from './components/Project/EditProject';
import ChangePassword from './components/User/ChangePassword';
import Batch from './components/Batch/Batch';
import NewBatch from './components/Batch/NewBatch';
import EditBatch from './components/Batch/EditBatch';
import UpdatePlacement from './components/Learners/UpdatePlacement';
import BulkUpload from './components/Learners/BulkUpload';

function App() {
  return (
   <>
    <Router>
     <Routes>
       <Route path="/" element={<Login/>} />
       <Route path="/dashboard" element={<LearnerDashboard/>} />

       <Route path="/course" element={<Course/>} />
       <Route path="/newcourse" element={<NewCourse/>} />
       <Route path="/editcourse/:id" element={<EditCourse/>} />

       <Route path="/learner" element={<Learner/>} />
       <Route path="/newlearner" element={<NewLearner/>} />
       <Route path="/editlearner/:id" element={<EditLearner/>} />
       <Route path="/updateplacement/:id" element={<UpdatePlacement/>} />
       <Route path="/bulkupload" element={<BulkUpload/>} />

       <Route path="/user" element={<User/>} />
       <Route path="/newuser" element={<NewUser/>} />
       <Route path="/edituser/:id" element={<EditUser/>} />
       <Route path="/changepassword/:id" element={<ChangePassword/>} />

       <Route path="/project" element={<Project/>} />
       <Route path="/newproject" element={<NewProject/>} />
       <Route path="/editproject/:id" element={<EditProject/>} />

       <Route path="/batch" element={<Batch/>} />
       <Route path="/newbatch" element={<NewBatch/>} />
       <Route path="/editbatch/:id" element={<EditBatch/>} />

     </Routes>
     </Router>

   
   <div className='footer ui center aligned header'>
     <span className="footer-text">Learner Tracker &copy; ICTAK</span>
   </div>

  </>
  );
}

export default App;
