const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    photo: {
        type: String
    },
 userItem:{ 
    type:mongoose.Schema.Types.ObjectId, 
    ref:"User" 
  } 
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item