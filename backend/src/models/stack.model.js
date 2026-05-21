const mongoose = require("mongoose");

const stackSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creator",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    cards: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "card"
        }],
        required: true
    },
    totalPoints: {
        type: Number,
        default: 50
    },
    coverImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const stackModel = mongoose.model("stack", stackSchema);

module.exports = stackModel;