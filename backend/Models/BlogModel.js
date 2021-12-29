const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    imagePath: {
        type: String,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema)