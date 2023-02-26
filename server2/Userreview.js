const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
     comment : {
        type: String,
        trim: true,
        required:true
    },
    userid : {
        type: String,
        required: true
    },
    productid : {
        type: Number,
        trim: true,
        required: true
    },
    positive : {
        type: Number,
        trim: true,
        required: true
    },
    negative : {
        type: Number,
        trim: true,
        required: true
    },
    neutral : {
        type: Number,
        trim: true,
        required: true
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Review",reviewSchema);