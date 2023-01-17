const express = require('express')
const router = express.Router()
const {getGroups, getGroup, createGroup, deleteGroup, addMember, deleteMember} = require('../contorllers/group.controller')
const {auth} = require('../middleware/auth')
const {authGroup} = require('../middleware/auth.group')

router.route('/').get(auth, getGroups).post(auth, createGroup)
router.route('/:id').get(auth, authGroup, getGroup).put(auth, authGroup, addMember).delete(auth, authGroup, deleteGroup)
router.route('/:id/:memberId').delete(auth, authGroup, deleteMember)

module.exports = router