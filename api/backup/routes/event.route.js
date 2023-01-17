const express = require('express')
const router = express.Router()
const {getEvents, createEvent} = require('../contorllers/event.controller')
const {auth} = require('../middleware/auth')
const {authGroup} = require('../middleware/auth.group')

router.get('/:id', auth, getEvents)
router.post('/create/:id', auth, authGroup, createEvent)


module.exports = router