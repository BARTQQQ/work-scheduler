import React, { useState, useEffect } from 'react';
import {TiDelete} from 'react-icons/ti';
import { useDispatch } from 'react-redux'
import { updateEvent} from '../../features/event/eventSlice'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const UpdateForm = (props) => {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        email: '',
        start: props.data.start,
        end: props.data.end,
        date: props.data.date,
        remarks: props.data.remarks,
    })
    const { email, start, end, date, remarks } = formData

    const {group} = useSelector(
        (state) => state.group
    )


    const dispatch = useDispatch()

    useEffect(() => {
        const selectedOption = group.members.find(member => member.name === props.data.user);
        setFormData(prevFormData => ({
          ...prevFormData,
          email: selectedOption.email,
        }));
      }, []);

    const onChange = event => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
  
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
            dispatch(updateEvent([id, props.data._id, eventData]))
            // dispatch(getEvents())
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
                                {group.members && group.members.length > 0 ? (
                                    group.members.map( (member, id) => 
                                        member.name === props.data.user ? (
                                            <option value={member.email} key={id}selected>{member.name} ({member.email})</option>
                                        ) : (
                                            <option value={member.email} key={id}>{member.name} ({member.email})</option>
                                        )
                                    )
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
                    <button type="submit">Update</button>
                </form>
            </section>
        </section>
    </section>
  )
}

export default UpdateForm