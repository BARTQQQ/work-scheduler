import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGroup } from '../features/group/groupSlice'

function Group({ group }) {
  const dispatch = useDispatch()
  console.log(group)
  return (
    <div className='group'>
      {/* <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div> */}
      <h3>{group.title}</h3>
      <p>Members: {group.members.length}</p>
      {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button> */}
    </div>
  )
}

export default Group