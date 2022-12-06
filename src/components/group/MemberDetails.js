import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMember} from '../../features/group/groupSlice'
import { MdPersonRemove } from 'react-icons/md'
import AskForm from './AskForm'

const MemberDetails = (props) => {
    const dispatch = useDispatch()

    const [isAskOpen, setIsAskOpen] = useState(false);
    
    const memberDelete = () => {
        dispatch(deleteMember([props.group._id, props.member.memberId]))
    }

    const toggleAsk = () => {
        setIsAskOpen(!isAskOpen);
    }

    return (
        <div className='member' key={props.member.memberId}>
            <div className="member-info">
                <p className='name'><b>Name: </b>{props.member.name}</p>
                <p className='email'><b>Email: </b><a href = {"mailto:" + props.member.email}>{props.member.email}</a></p>
            </div>
            <button className='delete' onClick={toggleAsk} title="Delete member">
                <MdPersonRemove/>
            </button>
            {isAskOpen && <AskForm handleClose={toggleAsk} action={memberDelete}/>}
        </div>
    )
}

export default MemberDetails