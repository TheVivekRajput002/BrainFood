const mongoose = require("mongoose")

const creatorSchema = new mongoose.Schema({
    profile_picture: {
        type: String,
        default: "https://i.pinimg.com/736x/f5/47/d8/f547d800625af9056d62efe8969aeea0.jpg"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followersCount: {
        type: Number,
        default: 0,
        required: true
    }
},
    { timestamps: true }
)

const creatorModel = mongoose.model("creator", creatorSchema);

module.exports = creatorModel;