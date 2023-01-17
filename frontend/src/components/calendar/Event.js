import React, {useState, useEffect } from 'react';
import EventItem from './EventItem';
import {HiPlus} from 'react-icons/hi';
// import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading';
import AddForm from './AddForm'

const Event = (props) =>  {
    // const { id } = useParams()
    const [isAddOpen, setIsAddOpen] = useState(false);

    const {events, eventLoading} = useSelector(
        (state) => state.event
    )

    const [date, setDate] = useState(props.date);
    const selectedDate = props.date.toLocaleDateString('default', {year: "numeric", month: "numeric", day: "numeric"})

    useEffect(() => {
        setDate(props.date);
    }, [props.date]);

    const getMonthName = () => {
        const getMonthName = date.toLocaleString('default', { month: 'long' })
        const getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)
        return getMonthNameToUpperCase
    }

    const getDayName = () => {
        const getDayName = props.date.toLocaleString('default', { weekday: 'long' })
        const getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
        return getDayNameToUpperCase
    }

    const toggleAdd = () => {
        setIsAddOpen(!isAddOpen);
    }

    return (
        <div className="event">
            <header className='event-header'>
                <p>{getDayName()}</p>
                <p>{props.date.getDate()} {getMonthName()} {props.date.getFullYear()}</p>
            </header>
            <div className="event-container">
            {eventLoading ? <ReactLoading className='loading' type="bubbles" color="#cfcfcf" /> : (

                    events.map((eventDate, id) => {
                        if(eventDate.date.toString() === selectedDate) {
                            return <EventItem key={id} data = {eventDate}/>
                        } else {
                            return ""
                        }
                    })

            )}
            </div>
            <div className="event-manage" title="Add">
                <button className="event-icon" onClick={toggleAdd}><HiPlus className="event-icon-add"/></button>
            </div>
            {isAddOpen && <AddForm handleClose={toggleAdd} data={events} date = {selectedDate}/>}
        </div>
    )
}

export default Event
