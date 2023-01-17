const Group = require('../models/group.model')
const User = require('../models/user.model')

// @desc Get groups
// @route GET /api/groups
const getGroups = async (req, res) => {
    const ownerGroups = await Group.find({
        ownerId: req.user.id
    })
    const memberGroups = await Group.find({
        members: {
            $elemMatch: {
                memberId: req.user.id
            }
        }
    })

    return res.status(200).json({
        owner: ownerGroups,
        member: memberGroups
    })
}

// @desc Get groups
// @route GET /api/group/:id
const getGroup = async (req, res) => {
    const { id } = req.params;

    const group = await Group.findById(id);
    
    return res.status(200).json(group);
}

// @desc create new group
// @route POST /api/events/create
const createGroup = async (req, res) => {

    const {title} = req.body
    const groupExist = await Group.findOne({title})

    if(groupExist){
        return res.status(400).json({message: 'Group already exists'})
    }

    if(title.length === 0){
        return res.status(400).json({message: 'Add group name'})
    }
    
    const group = await Group.create({
        ownerId: req.user.id,
        title: title,
    })

    if(group) {
        return res.status(201).json(group)
    }
}

// @desc delete group
// @route DELETE /api/group/:id
const deleteGroup = async (req, res) => {
    const group = await Group.findById(req.params.id)
    
    if(!group) {
        return res.status(400).json({message: 'Group not found'})
    }

    if(!req.user) {
        return res.status(401).json({message: 'User not found'})
    } 

    if (req.group.ownerId.toString() !== req.user.id) {
        return res.status(401).json({message: 'User not authorized'})
    }

    await group.remove()

    res.status(200).json('Removed successfully')
}

// @desc add member to group
// @route PUT /api/group/add/:id
const addMember = async (req, res) => {
    const email = req.body
    const member = await User.findOne(email).select('-password')

    if (req.group.ownerId.toString() !== req.user.id) {
        return res.status(401).json({message: 'User not authorized'})
    }
    // sprawdza czy uzyktownik ktorego chcemy dodac instnieje w bazie
    if(member) {
        
        // sprawdza czy użytkownik jest już w grupie
        const memberGroupExists = await Group.findOne({
            _id: req.group.id,
            members: {
                $elemMatch: {
                    memberId: member.id
                }
            }
        })

        if(memberGroupExists) {
            return res.status(400).json({message: 'Member is already in group'})
        }

        // dodaje uzytkownika do grupy (id grupy, zmiana)
        await Group.findOneAndUpdate({
            _id: req.group.id
        },{
            $push: {
                members: {
                    memberId: member.id,
                    name: member.name + ' ' + member.surrname,
                    email: member.email
                }
            }
        })
        return res.status(200).json({
            memberId: member.id,
            name: member.name + ' ' + member.surrname,
            email: member.email
        })
    } else {
        return res.status(400).json({message: "User not found"})
    }
}

// @desc delete member from group
// @route DELETE /api/group/add/:id
const deleteMember = async (req, res) => {
    const groupMember = await Group.findOne({
        _id: req.group.id,
        members: {
            $elemMatch: {
                memberId: req.params.memberId
            }
        }
    })

    if (req.group.ownerId.toString() !== req.user.id) {
        return res.status(401).json({message: 'User not authorized'})
    }

    if(groupMember) {
        await Group.updateOne({
            _id: req.group.id
        },{
            $pull: {
                members: {
                    memberId: req.params.memberId
                }
            }
        })
        return res.status(200).json({id: req.params.memberId})
    }

    return res.status(400).json({message: "No such member"})
}


module.exports = {getGroups, getGroup, createGroup, deleteGroup, addMember, deleteMember}