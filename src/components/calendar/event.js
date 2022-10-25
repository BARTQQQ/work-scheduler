import React from 'react';
import {ReactComponent as Edit} from '../icons/edit-pen.svg'
import {ReactComponent as Plus} from '../icons/plus.svg'
import {ReactComponent as Delete} from '../icons/trash.svg'

const Event = (props) => {

    // transform date int to date string
    let getDayName = props.date.toLocaleString('default', { weekday: 'long' })
    let getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
    let getMonthName = props.date.toLocaleString('default', { month: 'long' })
    let getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

    let data = props.date.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})
    

    return (
            <div className="event">
                <div className="event-header">
                    <p>{getDayNameToUpperCase}</p>
                    <p>{props.date.getDate()} {getMonthNameToUpperCase} {props.date.getFullYear()}</p>
                </div>
                <div className="event-container">
                    <div className="event-item">
                        <div className="event-item-data">
                            <p className="event-user">User #1</p>
                            <p className="event-user-change">Od 10 do 18</p>
                        </div>
                        <div className="event-manage-data">
                            <button className="event-icon" onClick={() => {console.log(data)}}><Edit className="event-icon-edit"/></button>
                            <button className="event-icon" onClick={() => {console.log(data)}}><Delete className="event-icon-delete"/></button>
                        </div>
                    </div>
                </div>
                <div className="event-manage">
                    <button className="event-icon" onClick={() => {console.log(data)}}><Plus className="event-icon-add"/></button>
                </div>
            </div>
        )
}

export default Event