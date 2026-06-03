const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },

        category:{
            type:String,
            required:true
        },

        quantity:{
            type:Number,
            required:true,
        },

        purchaseDate:{
            type: Date,
            required: true
        },

        expiryDate:{
          type: Date,
          required: true
        },

        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    },

    {
        timestamps:true
    }
)

module.exports = mongoose.model("Product",productSchema);