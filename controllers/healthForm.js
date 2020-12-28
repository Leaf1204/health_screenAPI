
const HealthForm = require("../models/healthForm")
const auth = require("../auth")
const {Router} = require("express");
// const bcrypt =require("bcryptjs");
// const { update } = require("../models/user");
const router = Router();

// Create
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