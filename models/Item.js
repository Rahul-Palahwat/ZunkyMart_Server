const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    itemCode: {
        type: String,
        required: true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    imgLink:{
        type:String,
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    rating:{
        type:String,
        required:true,
        default:"Not Rated Yet"
    },
    discount:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    mrp:{
        type:Number,
        required:true,
    },
    reviews:{
        type:String,
        required:true,
        default:"No Reviews Yet"
    },
    description:{
        type:Array,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const item = mongoose.model('item', ItemSchema);
module.exports = item;