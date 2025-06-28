const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true },
    name:{type: String, require: true},
    category:String,
    description :String,
    price:{type: Number, require: true},
    oldPrice:Number,
    image :String,
    color :String,
    quantity: { type: Number, default: 1 },
},
{_id:false}
);

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestId:{type:String},
    products: [CartItemSchema],
    totalPrice: { type: Number,required:true ,default: 0 },
}, { timestamps: true });


module.exports =mongoose.model('Cart', CartSchema);
