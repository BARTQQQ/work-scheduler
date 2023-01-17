import React from 'react'

const Group = (group) => {
  // console.log(group)
  return (
    <div className='group-dashboard'>
      <h3>{group.title}</h3>
      <p>Members: {group.members.length}</p>
    </div>
  )
}

export default Group