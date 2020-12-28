require ("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const cors = require('cors')
const morgan =require("morgan");
const mongoose = require("./db/db");
const AuthRouter = require("./controllers/user");
const StudentRouter = require("./controllers/students");
const ParentRouter = require("./controllers/parents");
const TeacherRouter = require("./controllers/teachers");
const HealthFormRouter = require("./controllers/healthForm");
const auth = require("./auth");


//Middleware

app.use(express.json());

const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
// NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(cors())//ANYBODY CAN MAKE A REQUEST
app.use(morgan("tiny"));


//Routers
app.get("/", auth, (req, res) => {
    res.json(req.payload);
});

app.use("/auth", AuthRouter)

app.use("/student", StudentRouter);
app.use("/parent", ParentRouter);
app.use("/teacher", TeacherRouter);
app.use("/healthform", HealthFormRouter)

//Listener

app.listen(PORT, () => {
  console.log(`You'er listening on Port ${PORT}`);
});
