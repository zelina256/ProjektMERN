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

// ReadAll =>get
app.get("/allContact", async(req, res)=>{
    try{
        const allContact = await contactModel.find({})
        res.status(200).send(allContact)
        console.log(allContact)
    }catch(err){
         res.status(500).send("Not read contacts: "+err)
        console.log("Not read contacts: "+err)
    }
})

module.exports=app