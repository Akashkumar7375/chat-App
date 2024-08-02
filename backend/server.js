const express=require('express')
// const app=express()
const cors=require('cors')
require('dotenv').config()
const morgan=require('morgan')
require('../backend/ConnectionsDB/DB')
const authRouter=require('../backend/Router/AuthRouter')
const userRouter =require('./Router/UserRouter')

const{app,server}=require('./Socket/index')

app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))





app.use(morgan('dev'))
app.use('/user',userRouter)
app.use(authRouter)
server.listen(process.env.PORT,()=>{
    console.log(`server is running on port${process.env.PORT}`);

})