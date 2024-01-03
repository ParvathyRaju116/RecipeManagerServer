
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({

    commentText: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId:{ 
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    recipeId:{
        type: String,
        required: true 
    }

});

const comments = mongoose.model("comments", commentSchema)
module.exports = comments

