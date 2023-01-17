const Event = require('../models/event.model')
const Group = require('../models/group.model')

// @desc Get events
// @route GET /api/events
const getEvents = async (req, res) => {
    const events = await Event.find({userId: req.user.id})

    res.status(200).json(events)
}

// @desc create new event
// @route POST /api/events/create
const createEvent = async (req, res) => {
    const {email, hours, date, remarks} = req.body
    const memberGroup = await Group.findOne({
        _id: req.group.id,
        members: {
            $elemMatch: {
                email: email
            }
        }
    })
    const member = await Group.findOne({
        _id: req.group.id,
        members: {
            $elemMatch: {
                email: email
            }
        }
    });
    const userId = member.members[0].memberId.toString()

    if(!memberGroup) {
        res.status(401).json('User is not member')
    }
    console.log(userId)
    const event = await Event.create({
        groupId: req.group.id,
        userId: userId,
        hours: hours,
        date: date,
        remarks: remarks,
      })

    if(event){
        return res.status(200).json(event)
    }
}

module.exports = {getEvents, createEvent}