export default function Days (props) {
    const current = props.date
    const year = current.getFullYear()
    const month = current.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const weekDayOfFirstDayOfMonth = firstDayOfMonth.getDay()
    const monthLength = new Date(year, month + 1, 0).getDate();
    let daysOfMonth = []
  
    for(let emptyDay = 1; emptyDay < weekDayOfFirstDayOfMonth; emptyDay++){
        daysOfMonth.push({empty: true})
    }

    for(let day = 1; day <= monthLength; day++) {
        let dataOfDay = {
            date: (new Date(firstDayOfMonth)),
            dateString: firstDayOfMonth.toDateString(),
            year: firstDayOfMonth.getFullYear(),
            month: firstDayOfMonth.getMonth(),
            selected: (day === props.date.getDate()),
            numberDay: firstDayOfMonth.getDate(),
            empty: false
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);

        daysOfMonth.push(dataOfDay)
    }
    
    return (
        <div className="calendar-days">
            {daysOfMonth.map((day, i) => {
                return (
                    <div key={i} className={"calendar-day" + (day.empty ? " empty" : " full" + (day.currentDay ? " current-day" : ""))} onClick = {() => {props.changeDateOnClick(day)}}>
                        <p className={day.selected ? " selected" : ""}>{day.numberDay}</p>
                    </div>
                )
            })}
        </div>
    )
}
