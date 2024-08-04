const authtable = require('../Models/Auth')
const {Server}=require('socket.io')
const express=require('express')
const app =express()
 const http=require('http') 
const getUserDetailstoken = require('../helper/getUserDetails')
const { set } = require('mongoose')
const {Conversation,MessageTable}=require('../Models/Conversation')
const upload=require('../Middleware/multer')
const fs = require('fs');
const path = require('path');
const { populate } = require('dotenv')
const getConverstion=require('../helper/getConverstion')


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
    try{
    console.log('new client connected',socket.id);

// current user details
    const token=socket.handshake.auth.token


 let user=await getUserDetailstoken(token)


//  create a room
socket.join(user?._id.toString())
onlineuser.add(user?._id?.toString())


io.emit('onlineUser',Array.from(onlineuser))


socket.on('message-page',async(id)=>{
    try{
   
    // console.log('UserId' , id);
  const userDetails=await authtable.findById(id)
const data={
    _id:userDetails?.id,
    fullname:userDetails?.fullname,
    email:userDetails?.email,
    online:onlineuser?.has(id),
    profileimg:userDetails?.profileimg
}
socket.emit('message-user',data)


// get previous message
const getConverstion =await Conversation.findOne({
    "$or":[
        {sender:user?._id,receiver:id},
        {sender:id,receiver:user?._id}
    ]
 }).populate('messages').sort({updatedAt:-1})

socket.emit('message',getConverstion?.messages ||[])
}catch(error){
    console.log(error.message);
    
}
})

// new messages
socket.on('new message',async(data)=>{
    try{
    let { imageUrl, videoUrl,} = data;
   

    const uploadsDir = path.join(__dirname, '../public/uploads');
    

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (imageUrl && typeof imageUrl === 'string') {
       
        const imageBuffer = Buffer.from(imageUrl.split(',')[1], 'base64'); // Assuming the image is sent as a base64 string
       
        const imageName = `image-${Date.now()}.jpg`;
        const imagePath = path.join(uploadsDir, imageName);
        fs.writeFileSync(imagePath, imageBuffer);
        imageUrl = imageName; // Save the filename in the database
    // console.log(imageUrl);
    
  }

  if (videoUrl && typeof videoUrl === 'string') {
    const videoBuffer = Buffer.from(videoUrl.split(',')[1], 'base64'); // Assuming the video is sent as a base64 string
    const videoName = `video-${Date.now()}.mp4`;
    const videoPath = path.join(_uploadsDir, videoName); // Correct path to store the video
    fs.writeFileSync(videoPath, videoBuffer);
    videoUrl = videoName; // Save the filename in the database
    console.log(videoUrl);
  }
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
        imgUrl:imageUrl,
        videoUrl:videoUrl,
        mesByUserId:data?.mesByUserId
     }) 
     const saveMessage=await message.save()

 
     const updateConverstion= await Conversation.updateOne({_id:converstion?._id},{
        "$push":{messages:saveMessage?._id}
     })
     
     const getConverstionMessage =await Conversation.findOne({
        "$or":[
            {sender:data?.sender,receiver:data?.receiver},
            {sender:data?.receiver,receiver:data?.sender}
        ]
     }).populate('messages').sort({updatedAt:-1})

     io.to(data?.sender).emit('message',getConverstionMessage?.messages || [])
     io.to(data?.receiver).emit('message',getConverstionMessage?.messages || [])


    //  send converstion

    
    const converstionSender= await  getConverstion(data?.sender)
    const converstionRecevier= await  getConverstion(data?.receiver)

    io.to(data?.sender).emit('converstion',converstionSender)
    io.to(data?.receiver).emit('converstion',converstionRecevier)

    }catch(error){
        console.log(error.message);
        
    }
})

// sidebar

socket.on('sidebar',async(currentUserId)=>{
    try{

    // console.log("current userId",currentUserId);

  const converstion= await  getConverstion(currentUserId)
  socket.emit('converstion',converstion)
 
}catch(error){
    console.log(error.message);
    
}
})


// seen

socket.on('seen',async(mesByUserId)=>{
    try{
    const  converstion =await Conversation.findOne({
        "$or":[
            {sender:user?._id,receiver:mesByUserId},
            {sender:mesByUserId,receiver:user?._id}
        ]
     })

     const converstionMessageId=converstion?.messages ||[]

     const UpdateMessages = await MessageTable.updateMany(
        {_id:{"$in":converstionMessageId},mesByUserId:mesByUserId,},
        {"$set":{seen:true}}
    )


    const converstionSender= await  getConverstion(user?._id.toString())
    const converstionRecevier= await  getConverstion(mesByUserId)

    io.to(user?._id.toString()).emit('converstion',converstionSender)
    io.to(mesByUserId).emit('converstion',converstionRecevier)
}catch(error){
    console.log(error.message);
    
}
})
    // disconnect
    socket.on('disconnect',()=>{
        onlineuser.delete(user?._id)
        console.log('client disconnected',socket.id);
    })
    }catch(error){
        console.log(error.messages);
        
    }
    
})

module.exports={
    app,
    server
}


 




