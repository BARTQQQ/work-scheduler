import React from 'react'
import { useNavigate } from 'react-router-dom';

function Group({ group }) {
  const navigate = useNavigate()

  const setGroup = () => {
    navigate(`/group/${group._id}`)
  }

  return (
    <div className='group' onClick={setGroup}>
      <h3>{group.title}</h3>
      <p>Members: {group.members.length}</p>
    </div>
  )
}

export default Group