const Group = require('../models/group.model')
const User = require('../models/user.model')

// @desc Get groups
// @route GET /api/groups
const getGroups = async (req, res) => {
    const ownerGroups = await Group.find({ownerId: req.user.id})
    const memberGroups = await Group.find({members: {$elemMatch: {id: req.user.id}}})

    res.json({owner: ownerGroups, member: memberGroups})
}

// @desc create new group
// @route POST /api/events/create
const createGroup = async (req, res) => {

    const {title} = req.body
    const groupExist = await Group.findOne({title})

    if(groupExist){
        return res.json('Group already exists')
    }
    
    const group = await Group.create({
        ownerId: req.user.id,
        title: title
    })

    if(group) {
        return res.json({
            ownerId: group.ownerId,
            title: group.title,
            members: group.members,
          })
    }
}

// @desc add member to group
// @route PUT /api/group/add/:id
const addMember = async (req, res) => {
    const email = req.body
    const group = await Group.findById(req.params.id)
    const member = await User.findOne(email).select('id')

    console.log(req.group.id)

    // sprawdza czy uzyktownik ktorego chcemy dodac instnieje w bazie
    if(member) {
        // sprawdza czy użytkownik jest już w grupie
        const memberGroupExists = await Group.findOne({_id: req.params.id ,members: {$elemMatch: {id: member.id}}})
        if(memberGroupExists) {
            console.log(memberGroupExists)
            return res.json('Member is already in group')
        }

        // dodaje uzytkownika do grupy (id grupy, zmiana)
        const add = await Group.findOneAndUpdate({_id: group.id}, {$push: {members: {id: member}}})
        return add
    } else {
        return res.json("User not found")
    }
}

module.exports = {getGroups, createGroup, addMember}