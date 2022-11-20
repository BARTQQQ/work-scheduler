import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './components/calendar/calendar'
import Dashboard from './components/Dashboard';
import Login from './components/userLogin'
import Register from './components/userRegister'
import './css/calendar-days-event.css'

function App() {
    return (
      <>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
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
        
        <Calendar />

      </>
    )
}
  
  export default App