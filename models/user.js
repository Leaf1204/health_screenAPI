const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    typeOf: {type:String}
}, 
{timestamps: true}
);

const User = model("user", userSchema);

module.exports = User; 