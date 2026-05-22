const badgeModel = require("../models/badge.model")
const userModel = require("../models/user.model")
const userBadgeModel = require("../models/userBadge.model")
const stackReadModel = require("../models/stackRead.model")
const watchedReelModel = require("../models/watchedReel.model")
const { getEventCount } = require("./achievementConditions.service")

async function awardBadge(userId, badge) {
    const userBadge = await userBadgeModel.create({
        userId,
        badgeId: badge._id,
        completedAt: new Date(),
    })

    const pointsBonus = Number(badge.pointsBonus) || 0

    if (pointsBonus > 0) {
        await userModel.findByIdAndUpdate(userId, {
            $inc: { score: pointsBonus },
        })
    }

    return userBadge
}

async function checkAchievements(userId, event) {
    if (!userId || !event) {
        return []
    }

    try {
        const badges = await badgeModel.find({ event }).lean()

        if (!badges.length) {
            return []
        }

        const completedBadges = await userBadgeModel
            .find({ userId })
            .select("badgeId")
            .lean()

        const completedIds = new Set(
            completedBadges.map((entry) => entry.badgeId.toString())
        )

        const currentCount = await getEventCount(userId, event)
        const unlocked = []

        for (const badge of badges) {
            if (completedIds.has(badge._id.toString())) {
                continue
            }

            const targetCount = Number(badge.targetCount) || 1

            if (currentCount >= targetCount) {
                const userBadge = await awardBadge(userId, badge)
                unlocked.push({ badge, userBadge })
            }
        }

        return unlocked
    } catch (error) {
        console.error("[achievements] checkAchievements failed:", error.message)
        return []
    }
}

async function recordStackRead(userId, stackId) {
    await stackReadModel.updateOne(
        { user: userId, stack: stackId },
        { $setOnInsert: { user: userId, stack: stackId } },
        { upsert: true }
    )
}

async function recordReelWatch(userId, reelId) {
    await watchedReelModel.updateOne(
        { user: userId, reel: reelId },
        { $setOnInsert: { user: userId, reel: reelId } },
        { upsert: true }
    )
}

module.exports = {
    awardBadge,
    checkAchievements,
    recordStackRead,
    recordReelWatch,
}
