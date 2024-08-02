const mongoose =require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/chatapp').then(()=>{
    console.log('Connect to Database');
}).catch((error)=>{
    console.log(error.message);
})