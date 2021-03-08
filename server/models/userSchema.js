const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    // username: {
    //     type: String,
    // },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    created: {
        type: Date,
    },
    links: {
        type: Types.ObjectId,
        ref: 'Link'
    }
})

module.exports = model('User', userSchema)