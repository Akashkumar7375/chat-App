const authtable = require('../Models/Auth')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
let jwt = require('jsonwebtoken')
require('dotenv').config()



exports.signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const id = req.params.id
        const user = await authtable.findOne({ email: email })
        let bpass = await bcrypt.hash(password, 10)
        if (!fullname) {
            throw new Error('name should not be blank')
        }
        else if (!password) {
            throw new Error('Password should not be blank')
        }
        else if (!email) {
            throw new Error('Email should not be blank')
        }
        else if (user !== null) {
            throw new Error('Email already exists')
        }
        else if (email !== null) {
            let data = authtable({ fullname: fullname, email: email, password: bpass })
            data.save()

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "rohitkumawatt304@gmail.com",
                    pass: "gtdlqqwmvnguzwus",
                },
            });
            console.log('connected to smtp server')
            await transporter.sendMail({
                from: "rohitkumawatt304@gmail.com", // sender address
                to: email, // list of receiversed to smtp server
                subject: 'Email Validation link!', // Subject line
                html: `<a href=http://localhost:3000/emailverify/${data.id}>Click is verfiy link</a>`, // plain text body

            });
            res.status(201).json({
                message: 'Account has been cerated.Email verifaction link has been sent to your Email Id',
                user: user,
                status: 201
            })
        }
    } catch (error) {
        res.status(400).json({

            message: error.message,
            status: 400
        })
    }
}

exports.emailverify = async (req, res) => {
    try {
        const id = req.params.id
        await authtable.findByIdAndUpdate(id, { status: 'Active' })
        res.status(200).json({
            message: "status Active",
            status: 200
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        })
    }
}


exports.uploadimg = async (req, res) => {
    try {
        let filename = req.file.filename
        let id = req.params.id
        await authtable.findByIdAndUpdate(id, { profileimg: filename })
        res.status(200).json({
            message: 'Successfully insert profile',
            status: 200
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const username = await authtable.findOne({ email: email})
        if(!email){
            throw new Error('Email should not be blank')
        }
        else if(!password){
            throw new Error('Password should not be blank')
        }else if (!username){
                throw new Error('UserName not found')
        }
        
        let payload = {
            id:username.id,
            loginname: username.email
        }
            var bpass = await bcrypt.compare(password, username.password)
            if (bpass) {
                if (username.status === 'Active') {
                    const token = jwt.sign(payload, process.env.SKEY)

                     let data={
                        _id:username._id,
                        email:username.email,
                        profileimg:username.profileimg,
                        fullname:username.fullname
                     }
                    res.status(200).json({
                        Apidata: data,
                        token: token,
                        status: 200,
                    })

                } else {
                    throw new Error('UserName not verifyed')
                }
            } else {
                throw new Error('Password not correct')
            }

        
    }
    catch (error) {
        res.status(400).json({

            message: error.message,
            status: 400
        })
    }
}


exports.updateprofile = async (req, res) => {
    try {
        const { fullname } = req.body;
        const id = req.params.id;

        console.log(fullname);

        // Check if fullname is not provided
        if (!fullname) {
            throw new Error("Name should not be blank*");
        }

        let userdata;

        // If file is provided, update profile image
        if (req.file !== undefined) {
            const filename = req.file.filename;
            userdata = await authtable.findByIdAndUpdate(id, { profileimg: filename }, { new: true });
        }

        // If fullname is provided, update fullname
        if (fullname) {
            userdata = await authtable.findByIdAndUpdate(id, { fullname: fullname }, { new: true });
        }

        // If both file and fullname are provided, update both
        if (req.file !== undefined && fullname) {
            const filename = req.file.filename;
            userdata = await authtable.findByIdAndUpdate(id, { fullname: fullname, profileimg: filename }, { new: true });
        }
        let data={
            _id:userdata._id,
            email:userdata.email,
            profileimg:userdata.profileimg,
            fullname:userdata.fullname
         }
        res.status(200).json({
            message: 'Profile updated successfully',
            ApiData: data,
            status: 200
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        });
    }
};
