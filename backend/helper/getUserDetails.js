const jwt=require('jsonwebtoken')
const authtable=require('../Models/Auth')

require('dotenv').config()


const getUserDetailstoken=async(token)=>{
    try{
    if(!token){
        return{
            message:'session out',
            logout:true
        }
    }

    const decode = jwt.verify(token,process.env.SKEY)

    const user=authtable.findById(decode.id)


    return user

}catch(error){
    console.log(error.message);
}

}

module.exports=getUserDetailstoken