const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'This add a name']},
    surrname: {
        type: String,
        required: [true, 'This add a surrname']},
    email: {
        type: String, 
        unique: true, 
        required: [true, 'Please add an email']},
    password: {
        type: String, 
        required: [true, 'Please add a password']}
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User