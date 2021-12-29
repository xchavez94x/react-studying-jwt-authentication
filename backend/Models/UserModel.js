const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usersSchema = new Schema({
    fullName: {
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
    
    age: {
        type: Number,
        required: true
    },
    posts: [
        
    ]
}, { 
    timestamps: true
})

module.exports = mongoose.model('Users', usersSchema );