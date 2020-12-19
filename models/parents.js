const {Schema, model} = require("mongoose");

const parentSchema = new Schema({
    parentName: {type: String, required: true},
    username: {type: String, required: true}
},
{timestamps: true});

const Parent = model("parent", parentSchema);

module.exports = Parent; 