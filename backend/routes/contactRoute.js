const express = require("express")
const app = express()
const contactModel = require("../models/contactModel")

// Create/ADD => post
app.post("/addContact", async(req, res)=>{
    try{
        const newContact = new contactModel(req.body)
        await newContact.save()
        res.status(200).send(newContact)
        console.log("added")
    }catch(err){
        res.status(500).send("Not add: "+err)
        console.log("Not add: "+err)
    }
})

module.exports=app