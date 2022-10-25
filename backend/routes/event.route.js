const express = require('express')
const router = express.Router()
const {getEvents, createEvent} = require('../contorllers/event.controller')

router.get('/', getEvents)
router.post('/create', createEvent)


module.exports = router