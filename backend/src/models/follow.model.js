const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    reel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const followModel = mongoose.model("follow", followSchema)
module.exports = followModel;