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
    user: {
        type: String
    },
    start: {
        type: Number
    },
    end: {
        type: Number
    },
    date: {
        type: String
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event