const mongoose = require("mongoose")

const stackReadSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        stack: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "stack",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

stackReadSchema.index({ user: 1, stack: 1 }, { unique: true })

const stackReadModel = mongoose.model("stackRead", stackReadSchema)

module.exports = stackReadModel
