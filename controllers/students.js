// const User = require("../models/user");
const Student = require("../models/students")
const auth = require("../auth")
const {Router} = require("express");
const router = Router();

// index
router.get("/", auth, async (req, res)=>{
    try {
        res.status(200).json(await Student.find());
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// fetch students for parent
router.get("/:username", auth, async (req, res)=>{
    try {
        const {username} = req.params;
        console.log("user name " + username);
        res.status(200).json(await Student.find({"parent_user_name": username}));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// Create
router.post("/", auth, async (req, res)=>{
    try {
        res.status(200).json(await Student.create(req.body));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// update
router.put("/:id", auth, async (req, res)=>{
    
    console.log("childname " + JSON.stringify(req.body));
    try {
        const {id} = req.params;
        res.status(200).json(await Student.findByIdAndUpdate(id, req.body, {new: true}));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// delete
router.delete("/:id", auth, async (req, res)=>{
    try {
        const {id} = req.params
        res.status(200).json(await Student.findByIdAndDelete(id));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

module.exports = router; 