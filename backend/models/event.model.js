const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    userID: {type: Number},
    hours: {type: Number},
    date: {type: String},
    remarks: {type: String}
},)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event