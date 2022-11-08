const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {
  let token 
    if (req.headers && req.headers.authorization) {
      try {
        token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(token, process.env.JWT)

        req.user = await User.findById(decoded._id).select('-password')
        
        next()
      } catch(err) {
        res.json(err)
      }
      }

    if (!token) {
      res.json('No token')
    }
}

module.exports = {auth}