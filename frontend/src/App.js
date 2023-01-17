import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './components/calendar/Calendar'
import Dashboard from './components/Dashboard';
import Login from './components/userLogin'
import Register from './components/userRegister'
import GroupDetails from './components/group/GroupDetails'
import './css/calendar-days-event.css'

function App() {
    return (
      <>
        <Router>
            <Routes>
                <Route path="/" element={<><Login/><Calendar/></>}/>
                <Route path="/register" element={<><Register/><Calendar/></>}/>
                <Route path="/group" element={<><Dashboard/><Calendar/></>}/>
                <Route path="/group/:id" element={<><GroupDetails/><Calendar/></>}/>
            </Routes>
            <ToastContainer
          position="bottom-center"
          autoClose={1500}
          closeOnClick
          rtl={false}
          draggable
          theme="dark"
        />
        </Router>
      </>
    )
}
  
  export default App