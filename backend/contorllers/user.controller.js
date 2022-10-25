const User = require('../models/user.model')

// @desc register new user
// @route POST /api/users
const registerUser = async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        surrname: req.body.surrname,
        email: req.body.email,
        password: req.body.password,
      })

    res.json(user)
}

module.exports = {registerUser}