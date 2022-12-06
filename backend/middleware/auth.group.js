const Group = require('../models/group.model')

const authGroup = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.id)
        const memberGroup = await Group.findOne({_id: group.id ,members: {$elemMatch: {memberId: req.user.id}}})

        if(req.user.id === group.ownerId.toString() || memberGroup){
            req.group = group
            next()
        } else {
            return res.status(401).json({message: 'User not authorized'})
        }

    } catch(err) {
        return res.status(401).json({message: err})
    }
}
  
  
  module.exports = {authGroup}