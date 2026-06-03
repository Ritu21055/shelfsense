const Product = require("../models/Product");

const addProduct = async(req,res)=>{
    try{
        const{
            productName,
            category,
            quantity,
            purchaseDate,
            expiryDate,
          } = req.body;

          const product = await Product.create({
             productName,
            category,
            quantity,
            purchaseDate,
            expiryDate,
            user:req.user._id
          })

          res.status(201).json(product);
    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

//get products
const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({
            user:req.user._id
        })
        const productWithStatus = products.map((product)=>{
            const today = new Date();
            const expiryDate = new Date(product.expiryDate);
            const diffTime = expiryDate - today;

            const daysLeft = Math.ceil(
                diffTime/(1000*60*60*24)
            )
            let status;
            if (daysLeft<0){
                status="Expired";
            }else if(daysLeft<7){
                status="Urgent";
            }else if(daysLeft<=30){
                status="Expiring Soon"
            }else{
                status="Safe"
            }

            return{
                ...product.toObject(),
                 status,
                 daysLeft,
            }
        })

        res.status(200).json(productWithStatus)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}



//update products
const updateProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }

        product.productName = req.body.productName || product.productName;
        product.category= req.body.category || product.category;
        product.quantity = req.body.quantity || product.quantity;
        product.purchaseDate = req.body.purchaseDate || product.purchaseDate;
        product.expiryDate = req.body.expiryDate ||  product.expiryDate; 
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);

    }catch(error){
       res.status(500).json({
        message:error.message
       })
    }
}

const getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
         if(!product){
            return res.status(400).json({
                message:"product not found"
            })
    }
    res.status(200).json(product);
}catch(error){
        res.status(500).json({
            message: error.message
        })
    }}

//delete products
const deleteProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                message:"product not found"
            })
        }
        await product.deleteOne()
        res.status(200).json({
            message: "Product deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//dashboard
const getDashboardStats = async(req,res)=>{
    try{
        const products = await Product.find({
            user:req.user._id,
        })
        let safe = 0;
        let expiringSoon= 0;
        let urgent = 0;
        let expired = 0;

        products.forEach((product)=>{
            const today = new Date();
            const expiryDate = new Date(product.expiryDate);
            const diffTime = expiryDate - today;

            const daysLeft = Math.ceil(
                diffTime/(1000*60*60*24)
            )

            if(daysLeft<0){
                expired++;
            }else if(daysLeft<7){
                urgent++;
            }else if(daysLeft<=30){
                expiringSoon++;
            }else{
                safe++;
            }
        })
        res.status(200).json({
            totalProducts: products.length,
            safe,
            expiringSoon,
            urgent,
            expired,
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    getDashboardStats,
    updateProduct,
    getProductById,
}