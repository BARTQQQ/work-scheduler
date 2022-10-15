const Event = (props) => {
    let getDayName = props.date.toLocaleString('default', { weekday: 'long' })
    let getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
    let getMonthName = props.date.toLocaleString('default', { month: 'long' })
    let getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

    return (
            <div className="event">
                <div className="event-header">
                    <p>{getDayNameToUpperCase}</p>
                    <p>{props.date.getDate()} {getMonthNameToUpperCase} {props.date.getFullYear()}</p>
                </div>
            </div>
        )
}

export default Event