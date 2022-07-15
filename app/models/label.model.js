const mongoose = require("mongoose");
const LabelSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: ["banner", "brand"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    }
}, {
    timestamp: true,
    autoCreate: true,
    autoIndex: true
})
const LabelModel = mongoose.model("Label", LabelSchemaDef);

module.exports = LabelModel;