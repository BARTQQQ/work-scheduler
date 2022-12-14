const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    hours: {
        type: Number
    },
    date: {
        type: String
    },
    remarks: {
        type: String
    }
},)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event