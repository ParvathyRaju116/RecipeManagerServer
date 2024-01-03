
const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({

   like: {
        type:Number,
        required: true,       
    },  
    userId:{ 
        type: String,
       
    },
    recipeId:{
        type: String,
        required: true 
    }

});

const likes = mongoose.model("likes", likeSchema)
module.exports = likes

