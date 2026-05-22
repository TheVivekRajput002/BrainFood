const mongoose = require("mongoose")

const watchedReelSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        reel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reel",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

watchedReelSchema.index({ user: 1, reel: 1 }, { unique: true })

const watchedReelModel = mongoose.model("watchedReel", watchedReelSchema)

module.exports = watchedReelModel
