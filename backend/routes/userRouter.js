const express = require("express") 
const app=express() 
const userModel = require("../models/userModel") 
const bcrypt = require("bcrypt") 
const cookieParser =require("cookie-parser") 
const jwt=require("jsonwebtoken") 
app.use(cookieParser()) 
require('dotenv').config()
// register
app.post("/register", async (req, res) => { 
  try { 
    const userInfo = req.body; 
    const findUser = await userModel.findOne({ email: userInfo.email }); 
    if (findUser) { 
      return res.status(400).send("User exist"); 
    } else { 
      const newUser = new userModel({ 
        ...req.body, 
        password: bcrypt.hashSync(userInfo.password, 10), 
      }); 
      await newUser.save(); 
      res.status(200).send(newUser); 
    } 
  } catch (err) { 
    res.status(500).send("User not created " + err); 
    console.log("user not register "+err)
  }});

// login
app.post("/login", async(req, res)=>{ 
    try{ 
        const userInfo = req.body 
        const findUser = await userModel.findOne({email:userInfo.email}) 
        if(findUser){ 
            const passwordCompare = bcrypt.compareSync(userInfo.password, findUser.password) 
            if(passwordCompare){ 
               const token = jwt.sign({id: findUser._id, username: findUser.username, email:findUser.email}, 
                process.env.TokenSecret) 
               res.cookie("accessToken", token, {httpOnly:true, maxAge:360000}) 
               .json({id: findUser._id, username: findUser.username, email:findUser.email}) 
            }else{ 
                res.status(400).send("user not found") 
            } 
        }else{ 
            res.status(404).send("user not found") 
        } 
    }catch(err){ 
        res.status(500).send("Not login") 
    }}) 

// user 
app.get("/user", async(req, res)=>{ 
    const {accessToken} = req.cookies 
 
    jwt.verify(accessToken,"secret",{}, (err, info)=>{ 
        if(err){ 
            console.log("Unauthorized") 
            res.status(401).send("Unauthorized") 
        } 
        res.status(200).send(info) 
    }) 
}) 
// logout
app.post("/logout", async (req, res) => { 
  res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true }) 
    .json("Log out"); 
});
module.exports = app