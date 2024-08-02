const authtable=require('../Models/Auth')




exports.serach=async(req,res)=>{
    try{
        const {search}=req.body;
      const query =  new RegExp(search,'i','g')
       
     const user =await authtable.find({
        $or : [
            {name:query},
            {email:query}
        ]
      })

      res.status(200).json({
        message:"all user",
        data:user,
       status:200
      })

    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400

        })
    }
}