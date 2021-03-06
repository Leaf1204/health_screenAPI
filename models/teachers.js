const {Schema, model} = require("mongoose");

const teacherSchema = new Schema({
    teacherName: {type: String, required: true},
    username: {type: String, required: true},
    students_ids: [{ type : 'ObjectId' }]
}, 
{timestamps: true}
);

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher; 