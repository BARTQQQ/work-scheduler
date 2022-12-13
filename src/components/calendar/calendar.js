import React, { useState, useEffect }  from 'react'
import Days from './Days'
import Event from './Event'
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getGroup} from '../../features/group/groupSlice'
import { getEvents } from '../../features/event/eventSlice'

const Calendar = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {events} = useSelector(
        (state) => state.event
    )

    useEffect(() => {
        if(!id){
            return
        }

        dispatch(getGroup(id))
        dispatch(getEvents(id))
    }, [id])


    const [current, setCurrent] = useState(new Date())
    const [keepEvent, setKeepEvent] = useState(new Date())
    const [hide, setHide] = useState(false)

    const getMonthName = () => {
        const getMonthName = current.toLocaleString('default', { month: 'long' })
        const getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)
        return getMonthNameToUpperCase
    }

    let previousMonth = async () => {
        setCurrent(new Date(current.setMonth(current.getMonth() - 1)))
        console.log(current)
    }

    let nextMonth = async () => {
        setCurrent(new Date(current.setMonth(current.getMonth() + 1)))
    }

    let changeDateOnClick = async (day) => {
        setCurrent(new Date(day.year, day.month, day.numberDay))
        setKeepEvent(new Date(day.year, day.month, day.numberDay))
    }

    const toggleEvent = () => {
        setHide(!hide);
    }
    
    return (
        <div className='calendar-event-wrapper'>
            <div className={"calendar-body" + (hide ? " event-hiden" : " event-open")} data-type={hide}>
                <nav>
                    <header className="calendar-month-switch">
                        <div className="arrow-left" onClick={previousMonth}>
                            <MdArrowBackIos className='icon arrow' />
                        </div>
                        <div className="calendar-header-date">
                            <p>{getMonthName()}</p>
                            <p>{current.getFullYear()}</p>
                        </div>
                        <div className="arrow-right" onClick={nextMonth}>
                            <MdArrowForwardIos className='icon arrow' />
                        </div>

                    </header>
                    {user ? (
                        <div className='button-hide' onClick={toggleEvent}>{hide ? <p><FaEyeSlash/> Show</p> : <p><FaEye/> Hide</p>}</div>
                    ) : (false)}
                </nav>
                <Days date = {current} eventDate = {events} changeDateOnClick = {changeDateOnClick} />
            </div>
            {user ? (
                <div className={hide ? "hide" : "open"}>
                    <Event date = {keepEvent} events = {events} />
                </div>
            ) : (false)}

        </div>
    )
}

export default Calendar
