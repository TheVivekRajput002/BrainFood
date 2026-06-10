const userModel = require("../models/user.model")
const { uploadFile } = require("../services/storage.service")
const { checkAchievements } = require("../services/achievement.service")
const { v4: uuid } = require("uuid")
const posthog = require("../lib/posthog")

function getUserProfile(req, res) {
    const user = req.user;
    res.status(200).json({
        user: user
    })
}

async function updateUserProfile(req, res) {
    const user = req.user

    const uploadFileResult = await uploadFile(req.file.buffer, uuid())

    await userModel.findByIdAndUpdate(
        user._id,
        {
            profile_picture: uploadFileResult.url,
            $inc: { profileUpdateCount: 1 },
        },
        { new: true }
    )

    const unlocked = await checkAchievements(user._id, "PROFILE_UPDATED")

    posthog.capture({
        distinctId: String(user._id),
        event: "user profile updated",
        properties: { update_type: "profile_picture" },
    })

    res.status(201).json({
        message: "profile picture updated succesfully",
        unlockedBadges: unlocked.map((entry) => entry.badge),
    })
}

async function updateUserBio(req, res) {
    const user = req.user
    const {bio } = req.body

    await userModel.findByIdAndUpdate(
        user._id,
        {
            bio: bio,
            $inc: { profileUpdateCount: 1 },
        },
        { new: true }
    )

    const unlocked = await checkAchievements(user._id, "PROFILE_UPDATED")

    posthog.capture({
        distinctId: String(user._id),
        event: "user profile updated",
        properties: { update_type: "bio" },
    })

    res.status(201).json({
        success:true,
        message: "bio updated succesfully",
        unlockedBadges: unlocked.map((entry) => entry.badge),
    })
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserBio
}
