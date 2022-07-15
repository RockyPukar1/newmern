const mongoose = require("mongoose");
const ProductSchemeDef  = new mongoose.Schema({
    // TODO: Schema Defination
});
const ProductModel = mongoose.model("Product", ProductSchemeDef);
module.exports = ProductModel;