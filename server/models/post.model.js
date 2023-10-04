const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userName:{
        type:String,
        required:true,  
    }
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema);