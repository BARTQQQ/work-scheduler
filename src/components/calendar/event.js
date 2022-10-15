const Event = (props) => {
    const getDayName = () => {
        let getDayName = props.date.toLocaleString('default', { weekday: 'long' })
        let getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
        return getDayNameToUpperCase
    }

    return (
            <div className="event">
                <div className="event-header">
                    <p>{getDayName()}, {props.date.getDate()}</p>
                </div>
            </div>
        )
}

export default Event