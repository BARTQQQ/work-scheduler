import React from 'react';
import ReactDOM from 'react-dom/client';
import Calendar from './components/calendar/calendar'
import Login from './components/userLogin'
import Register from './components/userRegister'
import './css/calendar-days-event.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login/>
    <Calendar />

  </React.StrictMode>
);
