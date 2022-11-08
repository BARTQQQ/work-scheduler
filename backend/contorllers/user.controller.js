const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

// @desc register new user
// @route POST /api/users/register
const registerUser = async (req, res) => {
    const {name, surrname, email, password} = req.body

    // sprawdza czy wszystkie pola zostaly wypelnione
    if(!name || !surrname || !email || !password){
      res.json('Please add all fields')
    }

    // sprawdza czy uzytkownik o takim emailu istnieje
    const userExist = await User.findOne({email})

    if(userExist){
      res.json('User already exists')
    }
    
    const hash = bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      surrname,
      email,
      password: hash
    })
  
    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        surrname: user.surrname,
        email: user.email
      })
    } else {
      res.json('Invalid user data')
    }
}

// @desc login users
// @route POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  const validPass = await bcrypt.compare(password, user.password);

  // Tworzy i przypisuje token 
  const token = jwt.sign({ _id: user._id }, process.env.JWT);
  
  if(user && validPass){
    res.header("auth-token", token).json(token);
  } else {
    res.json("Email or password is wrong");
  }

  // if(user && validPass){
  //   res.json({
  //     _id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     token: token
  //   })
  // } else {
  //   res.json("Email or password is wrong");
  // }
}

// @desc get users
// @route GET /api/users/
const getUser = async (req, res) => {
  // const me = await User.find({name: User.name})
  res.json(req.user)
  // console.log(req.user)
}

module.exports = {registerUser, loginUser, getUser}