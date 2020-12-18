const {Schema, model} = require("mongoose");

const studentSchema = new Schema({
    username: {type: String, required: true},
    childName: {type: String, required: true},
    teacherName: {type: String, required: true}
}, 
{timestamps: true}
);

const Student = model("student", studentSchema);

module.exports = Student; 