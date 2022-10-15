const Days = (props) => {
    const current = props.date
    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const weekDayOfFirstDayOfMonth = firstDayOfMonth.getDay()
    const monthLength = new Date(year, month + 1, 0).getDate()
    let weekDays = []
    let daysOfMonth = []

    for(let i = 1; i <= 7; i++){
        let days = new Date(2022, 7, i).toLocaleString('default', { weekday: 'long' })
        let daysToUpperCase = days.charAt(0).toUpperCase() + days.slice(1)
        weekDays.push(daysToUpperCase.substring(0,3))
    }

    // console.log(weekDays)
  
    for(let i = 1; i < weekDayOfFirstDayOfMonth; i++){
        daysOfMonth.push({empty: true})
    }

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
                                <p className={day.selected ? " selected" : ""}>{day.numberDay}</p>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default Days