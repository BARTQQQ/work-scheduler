import React, {Component} from 'react'
import {MdModeEdit} from 'react-icons/md';
import {TiDelete} from 'react-icons/ti';

export default class EventItem extends Component {

    render() {
        return (
            <div className="event-item">
                <div className="event-item-data">
                    <p className="event-user">User</p>
                    <p className="event-user-change">Od 10 do 18</p>
                </div>
                <div className="event-manage-data">
                    <button className="event-icon" onClick={() => {}}><TiDelete className="event-icon-delete"/></button>
                    <button className="event-icon" onClick={() => {}}><MdModeEdit className="event-icon-edit"/></button>
                </div>
            </div>
        )
    }
}