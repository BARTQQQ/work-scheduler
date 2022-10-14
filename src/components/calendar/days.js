export default function Days (props) {
    const current = props.date
    const year = current.getFullYear()
    const month = current.getMonth()
    const day = current.getDate()
    
    const firstDayOfMonth = new Date(year, month, 1)
    const weekDayOfFirstDayOfMonth = firstDayOfMonth.getDay()
    
    const monthLength = new Date(year, month + 1, 0).getDate();
    let daysOfMonth = []
  
    // console.log("Year:", year )
    // console.log("Month:", month)
    console.log("Day:", day, props.date.getDate())
    // console.log("MonthLenght:", monthLength)
    // console.log("weekDay:", weekDayOfFirstDayOfMonth)
    // console.log("FirstDay:", firstDayOfMonth.toDateString())
    // console.log("FirstDay:", current.toLocaleString('default', { month: 'long' }))

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
    console.log(daysOfMonth)
    // current.setMonth(current.getMonth());
    // const previousMonth = current.toLocaleString('default', { month: 'long' });
    return (
        <div className="calendar-days">
            {daysOfMonth.map((day) => {
                return (
                    <div className={"calendar-day" + (day.empty ? " empty" : " full" + (day.currentDay ? " current-day" : ""))}>
                        <p className={day.selected ? " selected" : ""}>{day.numberDay}</p>
                    </div>
                )
            })}
        </div>
    )
}
