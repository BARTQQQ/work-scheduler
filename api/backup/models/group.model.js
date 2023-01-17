const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    members: [
        {
            memberId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: Schema.Types.String,
                ref: 'User'
            },
            email: {
                type: Schema.Types.String,
                ref: 'User'
            }
        }
    ]
}, {
    timestamps: true
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group