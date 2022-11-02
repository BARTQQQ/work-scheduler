import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Calendar from './components/calendar/calendar'
import Login from './components/userLogin'
import Register from './components/userRegister'
import './css/calendar-days-event.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    <Calendar />
    </Router>
  </React.StrictMode>
);
