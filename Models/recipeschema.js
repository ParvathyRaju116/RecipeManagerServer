const { ObjectId } = require('mongodb')
const mongoose=require('mongoose')
const users = require('./userSchema')

// schema
const recipeSchema=new mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    recipeName:{
        type:String,
        require:true
    },
    ingredients:{
        type:String,
        require:true
    },
    instructions:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    cookingTime:{
        type:String,
        require:true
    },
    difficultyLevel:{
        type:String,
        require:true
    },
    cuisineORcategory:{
        type:String,
        require:true
    },
    caption:{
        type:String,
        require:true
    },
    recipeImage:{
        type:String,
        require:true
    },
    cookingVideo:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const recipes=mongoose.model("recipes",recipeSchema)
module.exports=recipes