import React, { useState, useEffect } from 'react';
import {TiDelete} from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux'
import { createGroup, reset } from '../features/group/groupSlice'

const GroupForm = (props) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const onChange = (e) => {
        setTitle(e.target.value)
    }
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      dispatch(createGroup({ title }))
      setTitle('')
    }

  return (
    <section className="popup">
        <span className="overlay" onClick={props.handleClose}></span>
        <section className="popup-content">
            <header className='popup-header'>
                <h2>Create group</h2>
                <span className="popup-icon-close" onClick={props.handleClose}><TiDelete className="popup-icon-close"/></span>
            </header>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="input">
                        <label htmlFor="title">
                            <p>Group name</p>
                            <input 
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </section>
        </section>
    </section>
  )
}

export default GroupForm