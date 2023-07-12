const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
exports.isAuthenticatedUser = async(req,res,next)=>{
    try{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)
    
    next();


    }catch(err){
        console.log(err)
    }

   
}
exports.authorizedRoles = (...roles)=>{
    
 return (req,res,next)=>{
    
    if(!roles.includes(req.user.role)){
        
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
    }
    next()
 } 
     
   
}
