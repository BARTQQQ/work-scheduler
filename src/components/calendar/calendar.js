import React, {Component} from 'react'
import Days from './days'
import Event from './event'
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            current: new Date(),
            keepEvent: new Date(),
            hide: false,
        }

        this.event = new Date(2022, 9, 20)
    }

    getUser() {
        const {user} = useSelector((state) => state.auth)
        console.log(user)
    }

    getMonthName() {
        let getMonthName = this.state.current.toLocaleString('default', { month: 'long' })
        let getMonthNameToUpperCase = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)
        return getMonthNameToUpperCase
    }

    previousMonth = async () => {
        await this.setState({current: new Date(this.state.current.setMonth(this.state.current.getMonth() - 1))})
    }

    nextMonth = async () => {
        await this.setState({current: new Date(this.state.current.setMonth(this.state.current.getMonth() + 1))})
    }

    changeDateOnClick = async (day) => {
        await this.setState({current: new Date(day.year, day.month, day.numberDay)})
        await this.setState({keepEvent: new Date(day.year, day.month, day.numberDay)})
    }
    
    render() {
        return (
            <div className='calendar-event-wrapper'>
                <div className={"calendar-body" + (this.state.hide ? " event-hiden" : " event-open")}>
                    <nav>
                        <header className="calendar-month-switch">
                            <div className="arrow-left" onClick={this.previousMonth}>
                                <MdArrowBackIos className='icon arrow' />
                            </div>
                            <div className="calendar-header-date">
                                <p>{this.getMonthName()}</p>
                                <p>{this.state.current.getFullYear()}</p>
                            </div>
                            <div className="arrow-right" onClick={this.nextMonth}>
                                <MdArrowForwardIos className='icon arrow' />
                            </div>

                        </header>
                        <div className='button-hide' onClick={() => this.setState({hide: !this.state.hide})}>{this.state.hide ? <p><FaEyeSlash/> Show</p> : <p><FaEye/> Hide</p>}</div>
                    </nav>
                    <Days date = {this.state.current} eventDate = {this.event} changeDateOnClick = {this.changeDateOnClick} />
                </div>
                <div className={this.state.hide ? "hide" : "open"}>
                    <Event date = {this.state.keepEvent}/>
                </div>
            </div>
        )
    }
}