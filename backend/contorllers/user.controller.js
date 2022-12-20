const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

// @desc register new user
// @route POST /api/users/register
const registerUser = async (req, res) => {
    const {name, surrname, email, password} = req.body

    const userExist = await User.findOne({email})

    const option = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (userExist) {
      return res.status(400).json({message: 'User already exists'})
    }

    if(!name){
      return res.status(400).json({message:'Add a name'})
    }
    
    if(!surrname){
      return res.status(400).json({message:'Add a surrname'})
    }

    if(!email){
      return res.status(400).json({message:'Add a email'})
    }

    if(!password){
      return res.status(400).json({message:'Add a password'})
    }

    if(password.search(option)){
      return res.status(400).json({message:'Password should be min 8 letter, with at least a symbol, upper and lower case letters and a number'})
    }


    const hash = bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      surrname,
      email,
      password: hash
    })
  
    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        surrname: user.surrname,
        email: user.email,
        token: generateToken(user._id)
      })
    }
}

// @desc login users
// @route POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      surrname: user.surrname,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({message:"Wrong email or passoword"})
  }
}

// @desc get users
// @route GET /api/users/
const getUser = async (req, res) => {
  return res.status(200).json(req.user)
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: '30d',
  })
}

module.exports = {registerUser, loginUser, getUser}