import React, { useState } from 'react';
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import { deleteEvent} from '../../features/event/eventSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import UpdateForm from './UpdateForm'

const EventItem = (props) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [isAddOpen, setIsAddOpen] = useState(false);

    const start = JSON.stringify(props.data.start)
    const end = JSON.stringify(props.data.end)
    const total = end - start

    const eventDelete = () => {
        dispatch(deleteEvent([id, props.data._id]))
    }

    const toggleAdd = () => {
        setIsAddOpen(!isAddOpen);
    }

    console.log(props.data)

    return (
        <div className="event-item">
            <div className="event-item-data">
                <div className="event-user">{props.data.user}</div>
                <div className="event-date">{new Date(props.data.createdAt).toLocaleString('default')}</div>
                <div className="event-user-change">
                    <p><b>From-To: </b>{start} - {end} </p>
                    <p><b>Total: </b>{total}</p>
                </div>
                {props.data.remarks.length > 0 ? (
                <p className="event-remarks">
                    <b>Remarks:</b><br />
                    {props.data.remarks}
                </p>
                ): ('')}

            </div>
            <div className="event-manage-data">
                <button className="event-icon update" onClick={toggleAdd}>Update<HiPencilAlt className="event-icon-udpate"/></button>
                <button className="event-icon delete" onClick={eventDelete}>Delete<HiTrash className="event-icon-delete"/></button>
            </div>
            {isAddOpen && <UpdateForm handleClose={toggleAdd} data={props.data}/>}
        </div>
    )
}

export default EventItem