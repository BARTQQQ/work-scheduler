const express = require('express')
const router = express.Router()
const {getGroups, createGroup, deleteGroup, addMember, deleteMember} = require('../contorllers/group.controller')
const {auth} = require('../middleware/auth')
const {authGroup} = require('../middleware/auth.group')

router.route('/').get(auth, getGroups).post(auth, createGroup)
router.route('/:id').delete(auth, authGroup, deleteGroup)
router.route('/add/:id').put(auth, authGroup, addMember)
router.route('/delete/:id/:memberId').delete(auth, authGroup, deleteMember)

module.exports = router