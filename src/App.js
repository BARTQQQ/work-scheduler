import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Calendar from './components/calendar/calendar'
import Login from './components/userLogin'
import Register from './components/userRegister'
import './css/calendar-days-event.css'

function App() {
    return (
      <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
        <Calendar />
      </>
    )
}
  
  export default App