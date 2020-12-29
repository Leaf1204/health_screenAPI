
const HealthForm = require("../models/healthForm")
const Teacher = require("../models/teachers")
const auth = require("../auth")
const {Router} = require("express");
var ObjectId = require('mongoose').Types.ObjectId; 
// const bcrypt =require("bcryptjs");
// const { update } = require("../models/user");
const router = Router();

const getTodaysDate = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    return today;
}

// Fetch student roster for teacher
router.get("/:id", auth, async (req, res)=>{
    try {
        // todo : calulate based on result of questions
        const {id} = req.params;
        const result = [{
            name: "test",
            checked_in: "No",
            can_attend_school : "No"
        },
        {
            name: "test 2",
            checked_in: "Yes",
            can_attend_school : "Yes"
        }];

        let teacher = await Teacher.aggregate([
            {$match: { _id: new ObjectId(id)}},
            { "$lookup": {
                "from": "students",
                "localField": "students_ids",
                "foreignField": "_id",
                "as": "students"
            } }
        ]);
        
        if(teacher.length > 0){
            teacher = teacher[0];

            let foo = teacher.students.map(async (student)=>{
                let newStudent={
                    name: student.child_name,
                    checked_in: "No",
                    can_attend_school: "No"
                };
                let healthForm = await HealthForm.find({student_id:student._id,dateOf:`${getTodaysDate()}`});
                if(healthForm.length){
                    console.log("health form")
                    newStudent.checked_in = "Yes";
                    newStudent.can_attend_school = healthForm.can_attend_school;
                }
                //return newStudent;
                result.push(newStudent);
            });

            console.log(foo);
        }

        console.log(result);

        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({error})
    }
})

router.post("/", auth, async (req, res)=>{
    try {
        // todo : calulate based on result of questions
        req.body.can_attend_school = true;
        res.status(200).json(await HealthForm.create(req.body));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

module.exports = router; 