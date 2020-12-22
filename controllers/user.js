require("dotenv").config()
const User = require("../models/user");
const Parent = require("../models/parents");
const Teacher = require("../models/teachers");
const Student = require("../models/students");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Router} = require("express");
const router = Router();
const {SECRET} = process.env



router.post("/signup", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10);
        const user = new User({
            username : req.body.username,
            password : req.body.password,
            typeOf : "admin"
        });

        const newUser = await User.create(user);
        res.status(200).json(newUser);
    } catch(error) {
        res.status(400).json({error});
    }
});

router.post("/create_parent", async (req, res) => {
    try {
    
        //req.body.password = await bcrypt.hash(req.body.password,10);
        // create user first
        // let userToCreate = new {
        //     username : req.username,
        //     password : await bcrypt.hash(req.body.password,10)
        // };
        //const newUser = await User.create(req.body);

        // then create parent linked to user
        // const parentToCreate = new {
        //     parentName : req.body.parentName,
        //     user_id : newUser._id
        // }
        // Parent.create(parentToCreate);

        res.status(200);
    } catch(error) {
        res.status(400).json({error});
    }
});

router.post("/create_teacher", async (req, res) => {
    try {
    
        //req.body.password = await bcrypt.hash(req.body.password,10);
        // create user first
        let userToCreate = new {
            username : req.body.username,
            password : await bcrypt.hash(req.body.password,10)
        };
        const newUser = await User.create(userToCreate);

        // then create teacher linked to user
        const teacherToCreate = new {
            parentName : req.body.teacherName,
            user_id : newUser._id
        }
        Teacher.create(teacherToCreate);

        res.status(200);
    } catch(error) {
        res.status(400).json({error});
    }
});

router.post("/create_student", async (req, res) => {
    try {
        Student.create(req.body);
        res.status(200);
    } catch(error) {
        res.status(400).json({error});
    }
});

router.post("/login", async (req, res) => {
  try {
        const {username, password} =req.body
        const user = await User.findOne({username})
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if(match){
                const token = await jwt.sign({ username: username, typeOf: user.typeOf}, SECRET);
                res.status(200).json({token})
            } else {
                res.status(400).json({ error: "PASSWORD DOES NOT MATCH"});
            }
        } else {
            res.status(400).json({ eror: "USER DOES NOT EXIST"})
        }
  }
  catch(error){
    res.status(400).json({error })
  }
})


module.exports = router; 