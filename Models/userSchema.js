const mongoose=require('mongoose')
const recipe=require('./recipeschema')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    bio:{
        type:String,
       
    },
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    profile:{
        type:String
    }

    

})

const users=mongoose.model("users",userSchema)
module.exports=users 

