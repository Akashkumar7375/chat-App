const authtable = require('../Models/Auth')
const {Server}=require('socket.io')
const express=require('express')
const app =express()
 const http=require('http') 
const getUserDetailstoken = require('../helper/getUserDetails')
const { set } = require('mongoose')
const {Conversation,MessageTable}=require('../Models/Conversation')
const upload=require('../Middleware/multer')

 const server=http.createServer(app)
 const io=new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
        credentials:true
    }
    
 })

//  online user

let onlineuser=new Set()

//  socket running at =http://localhost:5001
io.on('connection',async(socket)=>{
    console.log('new client connected',socket.id);

// current user details
    const token=socket.handshake.auth.token


 let user=await getUserDetailstoken(token)


//  create a room
socket.join(user?._id.toString())
onlineuser.add(user?._id?.toString())


io.emit('onlineUser',Array.from(onlineuser))


socket.on('message-page',async(id)=>{
   
    console.log('UserId' , id);
  const userDetails=await authtable.findById(id)
const data={
    _id:userDetails?.id,
    fullname:userDetails?.fullname,
    email:userDetails?.email,
    online:onlineuser?.has(id),
    profileimg:userDetails?.profileimg
}
socket.emit('message-user',data)
   
})

// new messages
socket.on('new message',upload.single('file'),async(data)=>{
  console.log(data.imageUrl);
    let converstion = await Conversation.findOne({
        $or:[
            {sender:data?.sender,receiver:data?.receiver},
            {sender:data?.receiver,receiver:data?.sender}
        ]
     }) 
   
    
     if(!converstion){
        const createConverstion= new  Conversation({
            sender:data?.sender,
            receiver:data?.receiver
        })
        converstion =await createConverstion.save()
     }

     const message = new MessageTable({
        text:data?.text,
        imageUrl:data?.imageUrl,
        videoUrl:data?.videoUrl,
        mesByUserId:data?.mesByUserId
     }) 
     const saveMessage=await message.save()
 
     const updateConverstion= await Conversation.updateOne({_id:converstion?._id},{
        "$push":{messages:saveMessage?._id}
     })
     
     const getConverstion =await Conversation.findOne({
        "$or":[
            {sender:data?.sender,receiver:data?.receiver},
            {sender:data?.receiver,receiver:data?.sender}
        ]
     }).populate('messages').sort({updatedAt:-1})

     io.to(data?.sender).emit('message',getConverstion.messages)
     io.to(data?.receiver).emit('message',getConverstion.messages)
})


    // disconnect
    socket.on('disconnect',()=>{
        onlineuser.delete(user?._id)
        console.log('client disconnected',socket.id);
    })

    
})

module.exports={
    app,
    server
}


 




