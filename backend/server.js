const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const dotenv = require("dotenv");
const cors= require("cors");
const connectDB = require("./config/db.js");
// console.log(require("./config/db"));
dotenv.config();
connectDB();
const app= express();
app.use(cors());
app.use(express.json());
app.get("/" ,(req , res) =>{
    res.send("server is running");
});
app.listen(5000,()=>{
    console.log("server is running on port 5000");

});

app.use(express.json());
app.use("/api/auth", authRoutes);

const postRoutes= require("./routes/postRoutes");
app.use("/api/posts",postRoutes);

const userRoutes= require("./routes/userRoutes");


app.use("/api/users", userRoutes);
