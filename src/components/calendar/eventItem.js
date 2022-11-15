import React, {Component} from 'react'
import {ReactComponent as Edit} from '../icons/edit-pen.svg'
import {ReactComponent as Delete} from '../icons/trash.svg'

export default class EventItem extends Component {

    render() {
        return (
            <div className="event-item">
                <div className="event-item-data">
                    <p className="event-user">User</p>
                    <p className="event-user-change">Od 10 do 18</p>
                </div>
                <div className="event-manage-data">
                    <button className="event-icon" onClick={() => {}}><Edit className="event-icon-edit"/></button>
                    <button className="event-icon" onClick={() => {}}><Delete className="event-icon-delete"/></button>
                </div>
            </div>
        )
    }
}