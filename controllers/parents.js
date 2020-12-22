const User = require("../models/user");
const Parent = require("../models/parents")
const auth = require("../auth")
const {Router} = require("express");
const bcrypt =require("bcryptjs");
const router = Router();

// index
router.get("/", auth, async (req, res)=>{
    try {
        res.status(200).json(await Parent.find());
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
            typeOf: "parent"
         });
 
         const theUser = await User.create(newUser);
 
         let newParent = new Parent({
             username : theUser.username,
             parentName : req.body.parentName
         });
         res.status(200).json(await Parent.create(newParent));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// update
router.put("/:id", auth, async (req, res)=>{
    try {
        const {username} = req.payload
        req.body.username = username
        const {id} = req.params
        res.status(200).json(await Parent.findByIdAndUpdate(id, req.body, {new: true}));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

// delete
router.delete("/:id", auth, async (req, res)=>{
    try {
        const {username} = req.payload
        const {id} = req.params
        res.status(200).json(await Parent.findByIdAndDelete(id));
    }
    catch(error) {
        res.status(400).json({error})
    }
})

module.exports = router; 