const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    stackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stack",
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const cardModel = mongoose.model("card", cardSchema)

module.exports = cardModel