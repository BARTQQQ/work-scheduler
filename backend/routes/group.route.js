const express = require('express')
const router = express.Router()
const {getGroups, createGroup, addMember} = require('../contorllers/group.controller')
const {auth} = require('../middleware/auth')
const {authGroup} = require('../middleware/auth.group')

router.route('/').get(auth, getGroups).post(auth, createGroup)
router.route('/add/:id').put(auth, authGroup, addMember)

module.exports = router