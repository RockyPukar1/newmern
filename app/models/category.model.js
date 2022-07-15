const mongoose = require("mongoose");
const CategorySchemaDef = new mongoose.Schema({
    title: {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        image: String,
        slug: {
            type: String,
            required: true,
            unique: true
        },
        parent_id: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            default: null
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        },
        brands: [{
            type: mongoose.Types.ObjectId,
            ref: "Label"
        }],
        show_in_home: {
            type: Boolean,
            default: null
        }
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});
const CategoryModel = mongoose.model("Category", CategorySchemaDef);
module.exports = CategoryModel;