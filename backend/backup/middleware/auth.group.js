const Group = require('../models/group.model')

const authGroup = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id)
        const memberGroup = await Group.findOne({_id: group.id ,members: {$elemMatch: {memberId: req.user.id}}})

        if(req.user.id === group.ownerId.toString() || memberGroup){
            req.group = group
            next()
        } else {
            res.json('User not authorized, you are not a member of this group')
        }

    } catch(err) {
        res.json(err)
    }
}
  
  
  module.exports = {authGroup}