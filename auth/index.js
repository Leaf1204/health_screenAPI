require("dotenv").config();
const {SECRET} = process.env;
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
    ///Authorization: "bearer + token"
        if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const payload = await jwt.verify(token, SECRET);
        if (payload) {
            req.payload = payload 
            next();
        } else {
            res.status(400).json({error: "VERIFICATION FAILED OR NO PLAYLOAD"})
        }
        }else {
        res.status(400).json({error: "NO AUTHORIZATION"});
        }
    } catch(error) {
        res.status(400).json({error});
    }
};

module.exports = auth