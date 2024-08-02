const mongoose=require('mongoose')

let MessageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:''
    },
    imgUrl:{
        type:String,
        default:''
    },
    videoUrl:{
        type:String,
        default:''
    },
    seen:{
        type:Boolean,
        default:false
    },
    mesByUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    }
    
},{
    timestamps:true
})

let ConversationSchema= new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    messages:[
        {
        type:mongoose.Schema.ObjectId,
        ref:"messages"
    }
]
    
},{
    timestamps:true
})

let Conversation=mongoose.model('converstion',ConversationSchema)

let MessageTable=mongoose.model('messages',MessageSchema)

module.exports={
    Conversation,
    MessageTable
}