const Event = require('../models/event.model')

// @desc Get events
// @route GET /api/events
const getEvents = async (req, res) => {
    const events = await Event.find()

    res.json(events)
}

// @desc create new event
// @route POST /api/events/create
const createEvent = async (req, res) => {
    const event = await Event.create({
        userID: req.body.userID,
        hours: req.body.hours,
        date: req.body.date,
        remarks: req.body.remarks,
      })

    res.json(event)
}

module.exports = {getEvents, createEvent}