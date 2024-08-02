const router=require('express').Router()
const authcontroller= require('../Controller/UserController')
const {ConversationTable,MessageTable}=require('../Models/Conversation')



router.post('/usersearch',authcontroller.serach)










module.exports=router