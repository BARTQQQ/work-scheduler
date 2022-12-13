import React, { useState, useEffect } from 'react';
import {HiPlus} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getGroups, reset  } from '../features/group/groupSlice'
import { toast } from 'react-toastify';
import Group from './group/Group';
import CreateForm from './group/CreateForm';
import Info from './userInfo';
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
      navigate('/')
    }

    dispatch(getGroups())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="user">
      <Info/>
      <section className="user-dashboard">
        {isLoading ? <ReactLoading className='loading' type="bubbles" color="#cfcfcf" /> : 
          ((groups && groups.member && groups.owner ? (
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
      </section>
      <button className='create button' onClick={togglePopup} title="Create group"><HiPlus/>Create group</button>
      {isOpen && <CreateForm handleClose={togglePopup}/>}
    </div>
  )
}

export default Dashboard