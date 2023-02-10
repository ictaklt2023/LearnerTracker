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

function App() {
  return (
   <>
    <Router>
     <Routes>
       <Route path="/" element={<Login/>} />
       <Route path="/dashboard" element={<LearnerDashboard/>} />
       <Route path="/course" element={<Course/>} />
       <Route path="/newcourse" element={<NewCourse/>} />
       <Route path="/editcourse" element={<EditCourse/>} />
       <Route path="/learner" element={<Learner/>} />
       <Route path="/newlearner" element={<NewLearner/>} />
       <Route path="/editlearner" element={<EditLearner/>} />
     </Routes>
     </Router>

   
   <div className='footer ui center aligned header'>
     <span className="footer-text">Learner Tracker &copy; ICTAK</span>
   </div>

  </>
  );
}

export default App;
