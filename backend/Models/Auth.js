const mongoose=require('mongoose')



let authTable=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    profileimg:{
        type:String,
        
    },
    status:{
        type:String,
        required:true,
        default:"Suspended"

    }
},{
    timestamps:true
})

module.exports=mongoose.model('auth',authTable)

