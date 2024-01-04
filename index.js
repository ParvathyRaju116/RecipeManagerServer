require('dotenv').config()
const express=require('express')

const cors=require('cors')
require('./db/connection')
const routes=require('./Routes/routes')

const recipeManagerServer=express()
recipeManagerServer.use(cors())
recipeManagerServer.use(express.json())
recipeManagerServer.use(routes)

// recipeManagerServer.use('/uploads',express.static('./uploads'))
recipeManagerServer.use('/uploads',express.static('./uploads'))

const PORT=process.env.PORT || 4000;
recipeManagerServer.listen(PORT,()=>{
    console.log(`_____Recipe Manager Server Started at the Port Number ${PORT}______`);

})
