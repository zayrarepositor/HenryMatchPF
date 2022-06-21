const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // consultar cual es el fin de esto.
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    genderInt: {
        type: String,
    },
    description: {
        type: String,
    },
    henryLevel: {
        type: String,
        enum: ['m1', 'm2', 'm3', 'm4', 'graduate']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', userSchema)
