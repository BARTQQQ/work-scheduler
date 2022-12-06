const express = require('express')
const router = express.Router()
const {getEvents, createEvent, deleteEvent} = require('../contorllers/event.controller')
const {auth} = require('../middleware/auth')
const {authGroup} = require('../middleware/auth.group')

router.route('/:id').get(auth, authGroup, getEvents).post(auth, authGroup, createEvent)
router.route('/:id/:eventId').delete(auth, authGroup, deleteEvent)


module.exports = router