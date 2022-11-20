import React from 'react'
import { FaHouseUser, FaSignOutAlt, FaUser } from 'react-icons/fa';
// import { MdMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { getGroups } from '../features/group/groupSlice'
import { useEffect } from 'react';
import Group from './Group';
import ReactLoading from 'react-loading';

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {groups, isLoading, isError, message} = useSelector(
    (state) => state.group
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
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

  if (!groups) {

    return <p>Loading...</p>
  }
  return (
    <div className="user">
      <header className='header-dashboard'>
        <FaHouseUser className="icon dashboard"/>
        <section>
          <section className="user-info">
            <span><FaUser/></span>
            <p>{user && user.name} {user && user.surrname}</p>
            {/* <p><span><MdMail/></span> {user && user.email}</p> */}
          </section>
          <button onClick={onLogout} title="Logout"><FaSignOutAlt/></button>
        </section>
      </header>
      {
        isLoading ? <ReactLoading className='loading' type="bubbles" color="#212529" /> : 
          <section className="user-dashboard">
            {(groups.member || groups.owner ? (
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
              </div>) : (<h2 style={{opacity: ".5"}}>{groups}</h2>)
            )}
          </section>
      }
    </div>
  )
}

export default Dashboard