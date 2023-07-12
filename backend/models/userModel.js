const mongoose = require("mongoose")
const {Schema} = mongoose
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a correct email"],

    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should have more than 4 characters"],
        select:false,
    },
    avatar:{
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
    },
    role:{
        type: String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordEcpire:Date,

})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const Users = mongoose.model('Users',userSchema)

module.exports=Users