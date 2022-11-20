import React, {Component} from 'react'
import EventItem from './eventItem';
import {HiPlus} from 'react-icons/hi';


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
                    <EventItem/>
                </div>
                <div className="event-manage" title="Add">
                    <button className="event-icon" onClick={() => {console.log(this.props.date)}}><HiPlus className="event-icon-add"/></button>
                </div>
            </div>
        )
    }
}