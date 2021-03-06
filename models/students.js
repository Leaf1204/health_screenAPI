const {Schema, model} = require("mongoose");

const studentSchema = new Schema({
    child_name: {type: String, required: true},
    child_image: {type: String, required: true},
    parent_user_name: {type: String, required: true}
}, 
{timestamps: true}
);

const Student = model("student", studentSchema);

module.exports = Student; 