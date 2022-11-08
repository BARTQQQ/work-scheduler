const Group = require('../models/group.model')

const authGroup = async (req, res, next) => {
    try {
        const logged = req.user.id
        const group = await Group.findById(req.params.id)
        const groupOwner = group.ownerId.toString()

        if(logged === groupOwner){
            req.group = group
            next()
        } else {
            res.json('No permission, u are not the owner of the group')
        }

    } catch(err) {
        res.json(err)
    }
}
  
  
  module.exports = {authGroup}