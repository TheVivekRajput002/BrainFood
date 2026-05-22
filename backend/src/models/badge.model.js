const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        iconUrl: {
            type: String,
            default: "",
        },
        tier: {
            type: String,
            enum: ["bronze", "silver", "gold", "platinum"],
            required: true,
        },
        pointsBonus: {
            type: Number,
            default: 20,
        },
        event: {
            type: String,
            enum: [
                "STACK_READ",
                "REEL_WATCHED",
                "REEL_SAVED",
                "USER_FOLLOWED",
                "PROFILE_UPDATED",
            ],
            required: true,
        },
        targetCount: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    {
        timestamps: true,
    }
);

const badgeModel = mongoose.model("badge", badgeSchema);

module.exports = badgeModel;