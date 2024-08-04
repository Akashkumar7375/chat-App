const multer=require('multer')



let storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'../chat/public/uploads')
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+file.originalname)
    }
})


let upload=multer({
    storage:storage,
    limits:{fieldSize:1024*1024*4}
})

module.exports=upload


