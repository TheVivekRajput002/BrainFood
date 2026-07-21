const mongoose = require("mongoose")
const badgeModel = require("../models/badge.model")
const userBadgeModel = require("../models/userBadge.model")
const { awardBadge } = require("../services/achievement.service")
const posthog = require("../lib/posthog")

function getErrorMessage(error) {
    if (error?.code === 11000) {
        return "Badge already completed"
    }

    return error?.message || "Unable to complete badge"
}

async function completeBadge(req, res) {
    try {
        const { id: badgeId } = req.params
        const user = req.user

        if (!user?._id) {
            return res.status(401).json({
                success: false,
                message: "User session is invalid"
            })
        }

        if (!mongoose.Types.ObjectId.isValid(badgeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid badge id"
            })
        }

        const badge = await badgeModel.findById(badgeId)

        if (!badge) {
            return res.status(404).json({
                success: false,
                message: "Badge not found"
            })
        }

        const existingUserBadge = await userBadgeModel.findOne({
            userId: user._id,
            badgeId
        })

        if (existingUserBadge) {
            return res.status(200).json({
                success: true,
                message: "Badge already completed",
                userBadge: existingUserBadge
            })
        }

        const userBadge = await awardBadge(user._id, badge)

        posthog.capture({
            distinctId: String(user._id),
            event: "badge completed",
            properties: {
                badge_id: String(badge._id),
                badge_name: badge.name,
                badge_event: badge.event,
            },
        })

        res.status(200).json({
            success: true,
            userBadge
        })
    } catch (error) {
        posthog.captureException(error, req.user ? String(req.user._id) : undefined, { endpoint: "/api/badge/complete" })
        res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        })
    }
}

async function getBadges(req, res) {
    try {
        const user = req.user

        if (!user?._id) {
            return res.status(401).json({
                success: false,
                message: "User session is invalid"
            })
        }

        const badges = await badgeModel.find().lean()
        const userBadges = await userBadgeModel
            .find({ userId: user._id })
            .select("badgeId")
            .lean()

        const completedIds = new Set(
            userBadges.map((userBadge) => userBadge.badgeId.toString())
        )

        const badgesWithStatus = badges.map((badge) => ({
            ...badge,
            completed: completedIds.has(badge._id.toString())
        }))

        res.status(200).json({
            success: true,
            badges: badgesWithStatus
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: getErrorMessage(error)
        })
    }
}

module.exports = {
    completeBadge,
    getBadges
}
