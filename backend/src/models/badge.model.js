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
    },
    {
        timestamps: true,
    }
);

const badgeModel = mongoose.model("badge", badgeSchema);

module.exports = badgeModel;