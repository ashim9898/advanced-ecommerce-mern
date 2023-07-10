const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const app = require('../app')
const ApiFeatures = require('../utils/apifeatures')

// Create Product -- Admin
exports.createProduct = async(req,res,next)=>{
try{
    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}catch(error){
    next(error);
}
}


//Get all Products
exports.getAllProducts = async(req,res,next)=>{
try{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
   
    const products = await apiFeature.query
    res.status(201).json({
        success:true,
        products
    })
}catch(error){
    next(error)
}
}

//Get Product Details
exports.getProductDetails = async(req,res,next)=>{
   try{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product,
        productCount,
    })
}catch(error){
    next(error)
}
}

//Update Product
exports.updateProduct = async(req,res,next)=>{
    try{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}catch(error){
    next(error)
}
}

//Delete Product

exports.deleteProduct = async(req,res,next)=>{
    try{
    const result=await Product.deleteOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
}catch(error){
    next(error)
}
}