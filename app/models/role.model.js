const mongoose = require("mongoose");
const RoleSchemaDef = new mongoose.SchemaType({
    name: {
        type: String,
        unique: true,
        require: true
    }
}, {
    timestamps: true,   //createdAt, updatedAt
    autoCreate: true,
    autoIndex: true
})
const RoleModel = mongoose.model("Role", RoleSchemaDef);
module.exports = RoleModel;