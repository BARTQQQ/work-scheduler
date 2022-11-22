import React, { useState, useEffect } from 'react';
import { FaHouseUser, FaSignOutAlt, FaUser } from 'react-icons/fa';
import {HiPlus} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { getGroups } from '../features/group/groupSlice'
import { toast } from 'react-toastify';
import Group from './Group';
import GroupForm from './GroupForm';
import ReactLoading from 'react-loading';

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const {groups, isLoading, isError, message} = useSelector(
    (state) => state.group
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGroups())
    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  if (!groups) {
    return <p>Loading...</p>
  }

  return (
    <div className="user">
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
          <section className="user-dashboard">
            {isLoading ? <ReactLoading className='loading' type="bubbles" color="#212529" /> : 
              ((groups.member || groups.owner ? (
                <div className="groups">
                  {groups.owner.length > 0 ? (
                    <div className="owner">
                      <h2>Owner</h2>
                        {groups.owner.map((group) => (
                          <Group key={group._id} group={group} />
                        ))}
                    </div>) : (false)}
                  {groups.member.length > 0 ? (
                    <div className="member">
                      <h2>Member</h2>
                        {groups.member.map((group) => (
                          <Group key={group._id} group={group} />
                        ))}
                    </div>) : (false)}
                  {groups.member.length === 0 && groups.owner.length === 0 ? (
                      <h2 className='empty'>No groups</h2>
                        ) : (false)}
                </div>) : (false)
            ))}
            <button onClick={togglePopup} title="Create group"><HiPlus/>Create group</button>
          </section>
      {isOpen && <GroupForm handleClose={togglePopup}/>}
    </div>
  )
}

export default Dashboard