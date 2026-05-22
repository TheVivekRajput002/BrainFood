const savedReelModel = require("../models/savedReel.model")
const stackReadModel = require("../models/stackRead.model")
const watchedReelModel = require("../models/watchedReel.model")
const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

const EVENT_COUNT_HANDLERS = {
    REEL_SAVED: (userId) =>
        savedReelModel.countDocuments({ user: userId }),

    STACK_READ: (userId) =>
        stackReadModel.countDocuments({ user: userId }),

    REEL_WATCHED: (userId) =>
        watchedReelModel.countDocuments({ user: userId }),

    USER_FOLLOWED: (userId) =>
        followModel.countDocuments({ user: userId }),

    PROFILE_UPDATED: async (userId) => {
        const user = await userModel.findById(userId).select("profileUpdateCount").lean()
        return Number(user?.profileUpdateCount) || 0
    },
}

async function getEventCount(userId, event) {
    const handler = EVENT_COUNT_HANDLERS[event]

    if (!handler) {
        return 0
    }

    return handler(userId)
}

module.exports = {
    EVENT_COUNT_HANDLERS,
    getEventCount,
}
