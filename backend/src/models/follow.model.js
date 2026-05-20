const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"creator",
        required: true
    }
})

const followModel = mongoose.model("follow", followSchema)
module.exports = followModel;