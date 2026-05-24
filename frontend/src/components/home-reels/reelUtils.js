export const REEL_PAGE_LIMIT = 10
export const DOUBLE_TAP_MS = 300
export const WATCH_COMPLETE_THRESHOLD = 0.9

export function formatCount(value) {
    const count = Number(value) || 0

    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`
    }

    if (count >= 1000) {
        return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    }

    return `${count}`
}

export function mergeUniqueReels(existing, incoming) {
    const seen = new Set(existing.map((reel) => String(reel._id)))

    return [
        ...existing,
        ...incoming.filter((reel) => {
            const id = String(reel._id)

            if (!id || seen.has(id)) {
                return false
            }

            seen.add(id)
            return true
        }),
    ]
}

export function getCreatorFromReel(reel) {
    const creatorId = reel?.creator?._id || reel?.creator || reel?.creatorId

    return {
        creatorId,
        creator: {
            name: reel.creatorName || reel?.creator?.name || 'Creator',
            avatar:
                reel.creatorAvatar ||
                reel?.creator?.profile_picture ||
                'https://i.pravatar.cc/96?img=12',
            caption: reel.caption || reel.description || 'Fresh food reel',
        },
    }
}
