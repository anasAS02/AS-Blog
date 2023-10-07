const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userName:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,  
    },
}, {timestamps: true})

module.exports = mongoose.model('comment', commentSchema);