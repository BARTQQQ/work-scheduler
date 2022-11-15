const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'This field is required']},
    surrname: {
        type: String,
        required: [true, 'This field is required']},
    email: {
        type: String, 
        unique: true, 
        required: [true, 'This field is required']},
    password: {
        type: String, 
        required: [true, 'This field is required']}
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User