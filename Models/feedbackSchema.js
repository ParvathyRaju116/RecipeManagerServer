const mongoose=require("mongoose")

const feedbackSchema= new mongoose.Schema({
    uName:{
        type: String, 
        required:true 
    },
    feedbacks:{
        type: String, 
          required:true 
    }
});

const feedbacks=mongoose.model("feedbacks",feedbackSchema)
module.exports=feedbacks
