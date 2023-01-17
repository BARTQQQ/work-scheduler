import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteGroup, getGroups, getGroup, reset  } from '../../features/group/groupSlice'
import { resetEvent  } from '../../features/event/eventSlice'
import { toast } from 'react-toastify';
import {HiPlus, HiTrash} from 'react-icons/hi';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom';
import MemberDetails from './MemberDetails';
import Info from '../userInfo';
import ReactLoading from 'react-loading';
import AddForm from './AddForm'
import AskForm from './AskForm'

const GroupDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isAskOpen, setIsAskOpen] = useState(false);
    const {group, isLoading, isError, message} = useSelector(
        (state) => state.group
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(reset())
        dispatch(getGroup(id))
    }, [id, isError, message])

    const goBack = () => {
        dispatch(reset())
        dispatch(resetEvent())
        navigate('/group')
    }

    const groupDelete = () => {
        dispatch(deleteGroup(group._id))
        dispatch(getGroups())
        navigate('/group')
    }

    const toggleAdd = () => {
        setIsAddOpen(!isAddOpen);
    }

    const toggleAsk = () => {
        setIsAskOpen(!isAskOpen);
    }

    return (
        <div className="user">
            <Info/>
            <section className="user-dashboard">
            {isLoading ? <ReactLoading className='loading' type="bubbles" color="#cfcfcf" /> : (
                <div className="group">
                        <h2>{group && group.title}</h2>
                        {group ? (
                            <>
                                {group.members && group.members.length > 0 ? (
                                    group.members.map((member) => (
                                        <MemberDetails key={member.memberId} member={member} group={group}/>
                                    ))
                            ) : (<h3>No members</h3>)}
                            </>

                        ) : (false)}
                </div>
         
            )}
            </section>
            <nav>
                <button className='back btn' onClick={goBack} title="Go back"><RiArrowGoBackFill/></button>
                <button className='add btn' onClick={toggleAdd} title="Add member"><HiPlus/></button>
                <button className='delete btn' onClick={toggleAsk} title="Delete group"><HiTrash/></button>
            </nav>
          {isAddOpen && <AddForm handleClose={toggleAdd} data={group}/>}
          {isAskOpen && <AskForm handleClose={toggleAsk} action={groupDelete}/>}
        </div>
    )
}

export default GroupDetails