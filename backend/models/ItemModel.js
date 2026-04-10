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

})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item