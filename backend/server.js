// Importime librari
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
// konfigurime
app.use(cors(
{
credentials: true,
origin: "http://localhost:3000",
exposedHeaders: ["set-cookie"],
}))
app.use(session({
secret: "This will be secret",
resave: false,
saveUninitialized: true,
cookie: {maxAge: 1000 * 60 * 60 * 24}
}))
app.use(express.json({ limit: "1000mb", extended: true }));


// Test
const testFun = (req, res)=>{
    res.send("Hello")
}
app.use("/", testFun)


// Server
app.listen(5000, ()=>{
    console.log("Server Created")
})