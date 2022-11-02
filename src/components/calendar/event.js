import React, {Component} from 'react'
import {ReactComponent as Edit} from '../icons/edit-pen.svg'
import {ReactComponent as Plus} from '../icons/plus.svg'
import {ReactComponent as Delete} from '../icons/trash.svg'

export default class Event extends Component  {

    getMonthName() {
        let getMonthName = this.props.date.toLocaleString('default', { month: 'long' })
        let getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)
        return getMonthNameToUpperCase
    }

    getDayName() {
        let getDayName = this.props.date.toLocaleString('default', { weekday: 'long' })
        let getDayNameToUpperCase = getDayName.charAt(0).toUpperCase() + getDayName.slice(1)
        return getDayNameToUpperCase
    }

    render() {
        return (
            <div className="event">
                <header>
                    <p key={this.getDayName()}>{this.getDayName()}</p>
                    <p>{this.props.date.getDate()} {this.getMonthName()} {this.props.date.getFullYear()}</p>
                </header>
                <div className="event-container">
                    <div className="event-item">
                        <div className="event-item-data">
                            <p className="event-user">User</p>
                            <p className="event-user-change">Od 10 do 18</p>
                        </div>
                        <div className="event-manage-data">
                            <button className="event-icon" onClick={() => {console.log(this.props.date)}}><Edit className="event-icon-edit"/></button>
                            <button className="event-icon" onClick={() => {console.log(this.props.date)}}><Delete className="event-icon-delete"/></button>
                        </div>
                    </div>
                </div>
                <div className="event-manage">
                    <button className="event-icon" onClick={() => {console.log(this.props.date)}}><Plus className="event-icon-add"/></button>
                </div>
            </div>
        )
    }
}