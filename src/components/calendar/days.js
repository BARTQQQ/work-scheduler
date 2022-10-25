import React from 'react';

const Days = (props) => {
    const current = props.date
    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const weekDayOfFirstDayOfMonth = firstDayOfMonth.getDay()
    const monthLength = new Date(year, month + 1, 0).getDate()
    let weekDays = []
    let daysOfMonth = []

    const eventDate = props.eventDate.toDateString()

    console.log(eventDate)

    // adds week days to array also transoform date from int to string and sets first letter to uppercase  
    for(let i = 1; i <= 7; i++){
        let days = new Date(2022, 7, i).toLocaleString('default', { weekday: 'long' })
        let daysToUpperCase = days.charAt(0).toUpperCase() + days.slice(1)
        weekDays.push(daysToUpperCase.substring(0,3))
    }

    // sets calendar days which doesnt't belong to this month to empty so they are not displayed
    for(let i = 1; i < weekDayOfFirstDayOfMonth; i++){
        daysOfMonth.push({empty: true})
    }

    // adds calendar days to array with data
    for(let i = 1; i <= monthLength; i++) {
        let dataOfDay = {
            date: (new Date(firstDayOfMonth)),
            dateString: firstDayOfMonth.toDateString(),
            year: firstDayOfMonth.getFullYear(),
            month: firstDayOfMonth.getMonth(),
            selected: (i === props.date.getDate()),
            numberDay: firstDayOfMonth.getDate(),
            empty: false
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        daysOfMonth.push(dataOfDay)

        // console.log(daysOfMonth[i].dateString === eventDate ? true : false)
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
                            <div key={i} className={"calendar-day" + (day.empty ? " empty" : " full" + (day.currentDay ? " current-day" : ""))} onClick = {() => {props.changeDateOnClick(day)}}>
                                <p className={"calendar-day-number" + (day.selected ? " selected" : "")}>{day.numberDay}</p>
                                <p className='calendar-day-event-date'>{eventDate === day.dateString ? "a" : " "}</p>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default Days