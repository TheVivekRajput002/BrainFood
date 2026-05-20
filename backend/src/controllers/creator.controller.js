const creatorModel = require('../models/creator.model')
const reelModel = require("../models/reel.model")

async function getCreatorById(req, res) {

    const creatorId = req.params.id;

    const creator = await creatorModel.findById(creatorId)
    const foodItemsByCreator = await reelModel.find({ creator: creatorId })

    if (!creator) {
        return res.status(404).json({ message: "food partner not found" })
    }

    res.status(200).json({
        message: "food partner details received successfully",
        creator: {
            ...creator.toObject(),
            foodItems: foodItemsByCreator,
        }
    })

}

async function getCreatorProfile() {
    const creator = req.creator

    res.status(200).json({
        creator: {
            _id: creator._id,
            name: creator.name,
            email: creator.email,
            password: creator.password,
        }
    })
}

module.exports = {
    getCreatorById,
    getCreatorProfile
}
