const express = require("express")
const app = express()
const itemModel = require("../models/ItemModel")
const multer = require("multer")
const path = require("path")
// Konfigurimet e multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

// Create
app.post("/addItem", upload.single("photo") ,async (req, res) => {
    try {
        const newItem = new itemModel(
            {...req.body,
                photo:req.file.filename
            })
        await newItem.save()
        res.status(200).send(newItem)
        console.log("added item")
    } catch (err) {
        res.status(500).send("Not added item" + err)
        console.log("Not added item" + err)
    }
})
// Read all
app.get("/readItems", async (req, res) => {
    try {
        const allItems = await itemModel.find({})
        res.status(200).send(allItems)
        console.log(allItems)
    } catch (err) {
        res.status(500).send("Not read items" + err)
        console.log("Not read items" + err)
    }
})
// Read one
app.get("/readItem/:id", async (req, res) => {
    try {
        const itemId = req.params.id
        const oneItem = await itemModel.findById({_id:itemId})
        res.status(200).send(oneItem)
        console.log(oneItem)
    } catch (err) {
        res.status(500).send("Not read item" + err)
        console.log("Not read item" + err)
    }
})
// Delete
app.delete("/deleteItem/:id", async (req, res) => {
    try {
        const itemId = req.params.id
        await itemModel.findByIdAndDelete({_id:itemId})
         res.status(200).send("Delete item")
        console.log("Delete item")
    } catch (err) {
        res.status(500).send("Not deleted item" + err)
        console.log("Not deleted item" + err)
    }
})
// Update
app.patch("/updateItem/:id", upload.single("photo")  ,async (req, res) => {
    try {
        const itemId = req.params.id
        const itemInfo = {...req.body}
        if(req.file){
            itemInfo.photo = req.file.filename
        }
        const updateItem = await itemModel.findByIdAndUpdate(
            itemId,
            {$set:itemInfo},
            {new:true}
        )
        res.status(200).send(updateItem)
        console.log(updateItem)
    } catch (err) {
        res.status(500).send("Not updated item" + err)
        console.log("Not updated item" + err)
    }
})

module.exports = app