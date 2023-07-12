const ErrorHandler = require('../utils/errorhandler')
const User=require("../models/userModel")
const sendToken = require('../utils/jwtToken')

//Register a User
exports.registerUser = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body

        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"This is a sample id",
                url:"profilepicurl"
            }
        })

        sendToken(user,201,res)
    }catch(err){
        next(err)
    }
}

//Login User
exports.loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
   
    
    //checking if user has given email and password
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
   sendToken(user,200,res)
}catch(err){
    next(err)
}
}

//Logout User
exports.logout = async(req,res,next)=>{

    res.clearCookie("token")

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
}