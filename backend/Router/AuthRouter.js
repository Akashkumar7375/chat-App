let router=require('express').Router()
const authController=require('../Controller/AuthController')
const upload=require('../Middleware/multer')
const {ConversationTable,MessageTable}=require('../Models/Conversation')

router.post('/signup',authController.signup)
router.put('/emailverifyy/:id',authController.emailverify)
router.put('/uploadimg/:id',upload.single('img'),authController.uploadimg)
router.post('/login',authController.login)
router.put('/updateprofile/:id',upload.single('img'),authController.updateprofile)





module.exports=router