import React from 'react';

const Event = (props) => {

    // transform date int to date string
    let getDayName = props.date.toLocaleString('default', { weekday: 'long' })
    let getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
    let getMonthName = props.date.toLocaleString('default', { month: 'long' })
    let getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

    let data = props.date.toLocaleString()
    

    return (
            <div className="event">
                <div className="event-header">
                    <p>{getDayNameToUpperCase}</p>
                    <p>{props.date.getDate()} {getMonthNameToUpperCase} {props.date.getFullYear()}</p>
                </div>
                <div className="event-container">
                    <div className="event-item">
                        <p className="event-user">User #1</p>
                        <p className="event-user-change">Od 10 do 18</p>
                    </div>
                </div>
                <div className="event-manage">
                    <button className="event-add" onClick={() => {console.log(data)}}>add</button>
                    <button className="event-edit" onClick={() => {console.log(data)}}>edit</button>
                    <button className="event-delete" onClick={() => {console.log(data)}}>delete</button>
                </div>
            </div>
        )
}

export default Event