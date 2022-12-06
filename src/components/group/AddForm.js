import React, { useState } from 'react';
import {TiDelete} from 'react-icons/ti';
import { useDispatch } from 'react-redux'
import { addMember } from '../../features/group/groupSlice'

const CreateForm = (props) => {
    const [email, setEmail] = useState('')
    const userData = [props.data._id, {email}]

    const dispatch = useDispatch()

    const onChange = (e) => {
        setEmail(e.target.value)
    }
  
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addMember(userData))
        setEmail('')
    }

  return (
    <section className="popup">
        <span className="overlay" onClick={props.handleClose}></span>
        <section className="popup-content">
            <header className='popup-header'>
                <h2>Add member</h2>
                <span className="popup-icon-close" onClick={props.handleClose}><TiDelete className="popup-icon-close"/></span>
            </header>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="input">
                        <label htmlFor="email">
                            <p>Email</p>
                            <input 
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </section>
        </section>
    </section>
  )
}

export default CreateForm