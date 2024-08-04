const {Conversation,MessageTable}=require('../Models/Conversation')

const getConverstion=async(currentUserId)=>{

try{
    if(currentUserId){
        const currentUserConverstion=await Conversation.find({
            "$or":[
                {sender:currentUserId},
                {receiver:currentUserId}
            ]
        }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver')
    
    // console.log("currentUserConverstion",currentUserConverstion);
    
        const converstion=currentUserConverstion.map((conv)=>{
     
           
            const countUnseenMesg=conv?.messages.reduce((prv,cur)=>{
                const mesByUserId=cur?.mesByUserId?.toString()
                if(mesByUserId!==currentUserId){
                   return prv+(cur?.seen ? 0 : 1)
                }else{
                    return prv
                }
            },0)

            return{
                _id:conv?._id,
                sender:conv?.sender,
                receiver:conv?.receiver,
                unseenMesaage:countUnseenMesg,
                lastMsg:conv?.messages[conv?.messages?.length - 1]
            }
        })
        
    return converstion
        
        
    }else{
        return []
    }
}catch(error){
    console.log(error.message);
    
}
}

module.exports =getConverstion