const Event = require('../models/event.model')
const Group = require('../models/group.model')

// @desc Get events
// @route GET /api/events
const getEvents = async (req, res) => {
    const events = await Event.find({groupId: req.group.id})

    res.status(200).json(events)
}

// @desc create new event
// @route POST /api/events/create
const createEvent = async (req, res) => {
    const {email, start, end, date, remarks} = req.body
    const memberGroup = await Group.findOne({
        _id: req.group.id,
        members: {
            $elemMatch: {
                email: email
            }
        }
    })

    if(memberGroup) {
        const member = await Group.findOne({
            _id: req.group.id,
            "members.email": email
        },
        {
          "members.$": 1
        });

        if (req.group.ownerId.toString() !== req.user.id) {
            return res.status(401).json({message: 'User not authorized'})
        }
    
        const userId = member.members[0].memberId.toString()
        const userName = member.members[0].name.toString()
    
    
        const event = await Event.create({
            groupId: req.group.id,
            userId: userId,
            user: userName,
            start: start,
            end: end,
            date: date,
            remarks: remarks,
          })
    
        if(event){
            return res.status(200).json(event)
        }
    } else {
        return res.status(401).json({message: 'User is not member'})
    }
}

// @desc update new event
// @route PUT /api/events/update
const udpateEvent = async (req, res) => {
    const {email, start, end, date, remarks} = req.body
    const memberGroup = await Group.findOne({
        _id: req.group.id,
        members: {
            $elemMatch: {
                email: email
            }
        }
    })

    if(req.group.ownerId.toString() === req.user.id) {
        if(memberGroup) {
            const member = await Group.findOne({
                _id: req.group.id,
                "members.email": email
            },
            {
              "members.$": 1
            });
    
            const userId = member.members[0].memberId.toString()
            const userName = member.members[0].name.toString()
        
            const event = await Event.findOneAndUpdate({
                _id: req.params.eventId
            },{
                $set: {
                    userId: userId,
                    user: userName,
                    start: start,
                    end: end,
                    date: date,
                    remarks: remarks,
                }
            })
    
            const eventUpdated = await Event.findById({_id: req.params.eventId})
        
            if(eventUpdated){
                return res.status(200).json(eventUpdated)
            }
        } else {
            return res.status(401).json({message: 'User is not member'})
        }
    } else {
        return res.status(401).json({message: 'User not authorized'})
    }
    
}

const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.eventId)
    
    if(!event) {
        return res.status(400).json({message: 'Event not found'})
    }

    if (req.group.ownerId.toString() !== req.user.id) {
        return res.status(401).json({message: 'User not authorized'})
    }

    await event.remove()

    res.status(200).json({ id: req.params.eventId })
}


module.exports = {getEvents, createEvent, deleteEvent, udpateEvent}