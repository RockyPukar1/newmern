const mongoose = require("mongoose");
const ProductSchemeDef  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    image: [{
        type: String
    }],
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
        default: null
    },
    after_discount: {
        type: Number,
        min: 1,
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'out-of-stock'],
        default: 'inactive'
    },
    brands: {
        type: mongoose.Types.ObjectId,
        ref: "Label",
        default: 'null'
    },
    is_feature: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const ProductModel = mongoose.model("Product", ProductSchemeDef);
module.exports = ProductModel;