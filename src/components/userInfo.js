import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { resetEvent  } from '../features/event/eventSlice'
import { FaHouseUser, FaSignOutAlt, FaUser } from 'react-icons/fa';


const Info = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(resetEvent())
        dispatch(reset())
        navigate('/')
      }

  return (
    <header className='dashboard-header'>
        <FaHouseUser className="icon dashboard"/>
        <section>
            <section className="user-info">
                <span><FaUser/></span>
                <p>{user && user.name} {user && user.surrname}</p>
            </section>
            <button onClick={onLogout} title="Logout"><FaSignOutAlt/></button>
        </section>
    </header>
  )
}

export default Info
