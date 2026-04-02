// Importime librari
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

const contactRoute = require("./routes/contactRoute")
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

// MongoDB
// mongoose.connect('mongodb+srv://admin:123@cluster0.bq08cij.mongodb.net/Project?appName=Cluster0')
// .then(()=>console.log("DB Conneted"))
// .catch((err)=>console.log("Error" + err))
mongoose.connect('mongodb://localhost:27017/Project')
.then(()=>console.log("DB Conneted"))
.catch((err)=>console.log("Error" + err))


// Test
// const testFun = (req, res)=>{
//     res.send("Hello")
// }
// app.use("/", testFun)
app.use(contactRoute)

// Server
app.listen(5000, ()=>{
    console.log("Server Created")
})