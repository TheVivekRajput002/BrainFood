const userModel = require("../models/user.model")
const { uploadFile } = require("../services/storage.service")
const { v4: uuid } = require("uuid")

function getUserProfile(req, res) {
    const user = req.user;
    res.status(200).json({
        user: user
    })
}

async function updateUserProfile(req, res) {
    const user = req.user

    const uploadFileResult = await uploadFile(req.file.buffer, uuid())

    const new_user = await userModel.findByIdAndUpdate(
        user._id,
        { profile_picture: uploadFileResult.url },
        { new: true }
    )

    res.status(201).json({
        message: "profile picture updated succesfully",
        profile_picture: new_user.profile_picture,
    })
}

module.exports = {
    getUserProfile,
    updateUserProfile
}
