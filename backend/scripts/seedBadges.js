require("dotenv").config()
const mongoose = require("mongoose")
const badgeModel = require("../src/models/badge.model")

const DEFAULT_BADGES = [
    {
        name: "First Stack Reader",
        description: "Read your first stack",
        iconUrl: "https://img.icons8.com/fluency/96/book.png",
        tier: "bronze",
        event: "STACK_READ",
        targetCount: 1,
        pointsBonus: 20,
    },
    {
        name: "First Reel Watcher",
        description: "Watched your first reel",
        iconUrl: "https://img.icons8.com/fluency/96/play-button-circled.png",
        tier: "bronze",
        event: "REEL_WATCHED",
        targetCount: 1,
        pointsBonus: 20,
    },
    {
        name: "First Reel Saver",
        description: "Saved your first reel",
        iconUrl: "https://img.icons8.com/fluency/96/bookmark-ribbon.png",
        tier: "bronze",
        event: "REEL_SAVED",
        targetCount: 1,
        pointsBonus: 20,
    },
    {
        name: "Reel Collector",
        description: "Saved your 5th reel",
        iconUrl: "https://img.icons8.com/fluency/96/bookmark-ribbon.png",
        tier: "silver",
        event: "REEL_SAVED",
        targetCount: 5,
        pointsBonus: 50,
    },
    {
        name: "Stack Explorer",
        description: "Read your 2nd stack",
        iconUrl: "https://img.icons8.com/fluency/96/open-book.png",
        tier: "silver",
        event: "STACK_READ",
        targetCount: 2,
        pointsBonus: 50,
    },
    {
        name: "Stack Master",
        description: "Read your 3rd stack",
        iconUrl: "https://img.icons8.com/fluency/96/trophy.png",
        tier: "gold",
        event: "STACK_READ",
        targetCount: 3,
        pointsBonus: 100,
    },
]

async function seedBadges() {
    await mongoose.connect(process.env.MONGODB_URI)

    let created = 0
    let updated = 0

    for (const badge of DEFAULT_BADGES) {
        const result = await badgeModel.findOneAndUpdate(
            { name: badge.name },
            { $set: badge },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )

        if (result.createdAt?.getTime() === result.updatedAt?.getTime()) {
            created += 1
        } else {
            updated += 1
        }
    }

    console.log(`Badges synced: ${created} created, ${updated} updated.`)
    await mongoose.disconnect()
}

seedBadges().catch((error) => {
    console.error("Badge seed failed:", error.message)
    process.exit(1)
})
