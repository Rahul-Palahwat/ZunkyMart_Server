const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    itemCode: {
        type: String,
        required: true
    },
    imgLink:{
        type:String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
    },
    product:{
        type:Array,
        required:true
    },
    delivered:{
        type:Boolean,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;