// const User = require("../models/user");
const Teacher = require("../models/teachers")
const auth = require("../auth")
const {Router} = require("express");
const User = require("../models/user");
const bcrypt =require("bcryptjs");
const router = Router();

// index
router.get("/", auth, async (req, res)=>{
    try {
        // todo : write a project query to return student names instead of ids
        // https://stackoverflow.com/questions/46462035/join-lookup-object-ids-in-array
        res.status(200).json(await Teacher.find()); 
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// Create
router.post("/", auth, async (req, res)=>{
    try {
        let newUser = new User({
           username : req.body.username,
           password : await bcrypt.hash(req.body.password,10),
           typeOf: "teacher"
        });

        const theUser = await User.create(newUser);

        let newTeacher = new Teacher({
            username : theUser.username,
            teacherName : req.body.teacherName,
            students_ids: req.body.students_ids.split(",")
        });
        res.status(200).json(await Teacher.create(newTeacher));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// update
router.put("/:id", auth, async (req, res)=>{

    try {
        console.log("teacher " + JSON.stringify(req.body));
        
        const {id} = req.params;
        const updateTeacher = {
            teacherName : req.body.teacherName,
            students_ids: req.body.students_ids.split(",")
        };

        const updateResult = await Teacher.findByIdAndUpdate(id, updateTeacher);

        if(req.body.password != undefined){

            const updateUser = {
                password : await bcrypt.hash(req.body.password,10)
            };

            await User.findOneAndUpdate({username:updateResult.username}, updateUser, {useFindAndModify: false});
        }
        res.status(200).json(updateResult);
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// delete
router.delete("/:id", auth, async (req, res)=>{
    try {
        const {id} = req.params
        res.status(200).json(await Teacher.findByIdAndDelete(id));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

module.exports = router; 