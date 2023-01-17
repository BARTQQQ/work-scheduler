import React, { useState } from 'react';
import {TiDelete} from 'react-icons/ti';
import { useDispatch } from 'react-redux'
import { createEvent } from '../../features/event/eventSlice'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const CreateForm = (props) => {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        email: '',
        start: '',
        end: '',
        date: props.date,
        remarks: '',
    })

    const {group} = useSelector(
        (state) => state.group
    )

    console.log(formData)

    const { email, start, end, date, remarks } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    const onSubmit = (e) => {
        e.preventDefault()

        if(!email){
            toast.error('Choose member')
        } else {
            const eventData = {
                email,
                start,
                end,
                date,
                remarks
            }
            dispatch(createEvent([id, eventData]))
        }
    }

  return (
    <section className="popup">
        <span className="overlay" onClick={props.handleClose}></span>
        <section className="popup-content">
            <header className='popup-header'>
                <h2>Create event</h2>
                <span className="popup-icon-close" onClick={props.handleClose}><TiDelete className="popup-icon-close"/></span>
            </header>
            <section className='form'>
                <form onSubmit={onSubmit}>
                <div className="input">
                        <label htmlFor="email">
                            <p>Member</p>
                            <select id="email" name="email"onChange={onChange}>
                                <option value="" selected disabled hidden>Choose</option>
                                {group.members && group.members.length > 0 ? (
                                    group.members.map( (member, id) => 
                                    <option value={member.email} key={id} onChange={onChange}>{member.name}  ({member.email})</option> )
                                ): (false)}
                            </select>
                        </label>
                    </div>
                    <div className="input start">
                        <label htmlFor="start">
                            <p>Start</p>
                            <input 
                                type="text"
                                id="start"
                                name="start"
                                value={start}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="input end">
                        <label htmlFor="email">
                            <p>End</p>
                            <input 
                                type="text"
                                id="end"
                                name="end"
                                value={end}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="input">
                        <label htmlFor="remarks">
                            <p>Remarks</p>
                            <input 
                                type="text"
                                id="remarks"
                                name="remarks"
                                value={remarks}
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

export default CreateForm