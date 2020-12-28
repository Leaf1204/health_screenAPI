const {Schema, model} = require("mongoose");

const healthFormSchema = new Schema({
    dateOf: {type: String},
    student_id: {type: String},
    have_fever: {type: Boolean, required: true},
    have_cough: {type: Boolean, required: true},
    have_difficulty_breathing: {type: Boolean, required: true},
    have_loss_of_taste: {type: Boolean, required: true},
    have_new_symptoms: {type: Boolean, required: true},
    had_contact_with_covid: {type: Boolean, required: true},
    can_attend_school:{type:Boolean}
},
{timestamps: true});

const HealthForm = model("healthForm", healthFormSchema);

module.exports = HealthForm; 