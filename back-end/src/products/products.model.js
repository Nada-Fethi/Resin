const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema (
    {
        name:{type: String, require: true},
        category:String,
        description :String,
        price:{type: Number, require: true},
        oldPrice:Number,
        image :String,
        color :String,
        rating :{type: Number, default: 0},
        author:{type: mongoose.Types.ObjectId, ref:"User" , required: false },
})

const Products = mongoose.model("Product", ProductSchema);

module.exports = Products