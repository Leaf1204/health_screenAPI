require ("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const cors =require("cors");
const morgan =require("morgan");
const mongoose = require("./db/db");
const AuthRouter = require("./controllers/user")

//Middleware

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


//Routers
app.use("/auth", AuthRouter)
//Listener

app.listen(PORT, () => {
  console.log(`You'er listening on Port ${PORT}`);
});
