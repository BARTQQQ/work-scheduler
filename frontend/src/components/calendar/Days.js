import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { getEvents } from '../../features/event/eventSlice'


const Days = (props) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const {events, eventError, eventmessage} = useSelector(
        (state) => state.event
    )


    useEffect(() => {
        if(eventError) {
            toast.error(eventmessage)
        }

        if(!id) return

        dispatch(getEvents(id))
    }, [id, eventError, eventmessage])


    const current = props.date
    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const monthLength = new Date(year, month + 1, 0).getDate()
    let weekDayOfFirstDayOfMonth = firstDayOfMonth.getDay()
    let weekDays = []
    let daysOfMonth = []

    // const eventDate = props.eventDate.toDateString()

    // adds week days to array also transoform date from int to string and sets first letter to uppercase  
    for(let i = 1; i <= 7; i++){
        let days = new Date(2022, 7, i).toLocaleString('default', { weekday: 'long' })
        let daysToUpperCase = days.charAt(0).toUpperCase() + days.slice(1)
        weekDays.push(daysToUpperCase.substring(0,3))
    }

    // sets calendar days which doesnt't belong to this month to empty so they are not displayed
    if (weekDayOfFirstDayOfMonth === 0){
        weekDayOfFirstDayOfMonth = 7
    }
    for(let i = 1; i < weekDayOfFirstDayOfMonth; i++){
        daysOfMonth.push({empty: true})
    }

    // adds calendar days to array with data
    for(let i = 1; i <= monthLength; i++) {
        let dataOfDay = {
            date: (new Date(firstDayOfMonth)),
            dateString: firstDayOfMonth.toDateString(),
            dateNumber: firstDayOfMonth.toLocaleDateString(),
            year: firstDayOfMonth.getFullYear(),
            month: firstDayOfMonth.getMonth(),
            selected: (i === props.date.getDate()),
            numberDay: firstDayOfMonth.getDate(),
            empty: false
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        daysOfMonth.push(dataOfDay)
    }
    
    return (
        <div className="calendar-main">
            <div className='week-days'>
                {weekDays.map((day, i) => {
                    return (
                        <div key={i} className="week-day">
                            {day}
                        </div>
                    )})}
                </div>
                <div className="calendar-days">
                    {daysOfMonth.map((day, i) => {
                        return (
                            <div key={i} className={"calendar-day" + (day.empty ? " empty" : " fill" + (day.currentDay ? " current-day" : ""))} onClick = {() => {props.changeDateOnClick(day)}}>
                                <p className={"calendar-day-number" + (day.selected ? " selected" : "")}>{day.numberDay}</p>
                                {events.map((eventDate, i) => {
                                    if(eventDate.date.toString() === day.dateNumber) {
                                        return <p key={i} className={'calendar-day-event-date ' + (day.selected ? " selected" : "")}>{eventDate.user}</p>
                                    } else {
                                        return ""
                                    }
                                    })}
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default Days