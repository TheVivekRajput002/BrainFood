import { useRef } from 'react'
import { showUnlockedBadges } from '../../utils/badgeToasts'
import { toggleFollowCreator } from '../../utils/creatorFollow'
import {
    toggleLikedReel,
    updateLikedVideoState,
    writeLikedReels,
} from '../../utils/reelLike'
import {
    toggleSavedReel,
    updateSavedVideoState,
    writeSavedReels,
} from '../../utils/reelSave'

export function useReelActions({
    showToast,
    liked,
    setLiked,
    saved,
    setSaved,
    isFollowing,
    setIsFollowing,
    setMutedReels,
    setVideos,
}) {
    const pendingActions = useRef(new Set())

    const handleFollow = async (creatorId) => {
        if (!creatorId) return

        const actionKey = `follow-${creatorId}`
        if (pendingActions.current.has(actionKey)) return

        const previousFollowed = !!isFollowing[creatorId]
        const optimisticFollowed = !previousFollowed

        pendingActions.current.add(actionKey)
        setIsFollowing((prev) => ({
            ...prev,
            [creatorId]: optimisticFollowed,
        }))

        try {
            const { isFollowed, unlockedBadges } = await toggleFollowCreator(creatorId)

            setIsFollowing((prev) => ({
                ...prev,
                [creatorId]: isFollowed,
            }))
            showUnlockedBadges(unlockedBadges, showToast)
        } catch (error) {
            setIsFollowing((prev) => ({
                ...prev,
                [creatorId]: previousFollowed,
            }))
            console.error('Follow request failed:', error)
        } finally {
            pendingActions.current.delete(actionKey)
        }
    }

    const handleLikeClick = async (reel) => {
        const reelId = reel._id
        const actionKey = `like-${reelId}`
        if (pendingActions.current.has(actionKey)) return

        const previousLiked = !!liked[reelId]
        const optimisticLiked = !previousLiked

        pendingActions.current.add(actionKey)
        setLiked((prev) => {
            const next = { ...prev, [reelId]: optimisticLiked }
            queueMicrotask(() => writeLikedReels(next))
            return next
        })
        setVideos((prev) => updateLikedVideoState(prev, reelId, optimisticLiked))

        try {
            const isLiked = await toggleLikedReel(reelId)

            if (isLiked !== optimisticLiked) {
                setVideos((prev) => updateLikedVideoState(prev, reelId, isLiked))
                setLiked((prev) => {
                    const next = { ...prev, [reelId]: isLiked }
                    queueMicrotask(() => writeLikedReels(next))
                    return next
                })
            }
        } catch (error) {
            setLiked((prev) => {
                const next = { ...prev, [reelId]: previousLiked }
                queueMicrotask(() => writeLikedReels(next))
                return next
            })
            setVideos((prev) => updateLikedVideoState(prev, reelId, previousLiked))
            console.error('Like request failed:', error)
        } finally {
            pendingActions.current.delete(actionKey)
        }
    }

    const handleSaveClick = async (reel) => {
        const reelId = reel._id
        const actionKey = `save-${reelId}`
        if (pendingActions.current.has(actionKey)) return

        const previousSaved = !!saved[reelId]
        const optimisticSaved = !previousSaved

        pendingActions.current.add(actionKey)
        setSaved((prev) => {
            const next = { ...prev, [reelId]: optimisticSaved }
            queueMicrotask(() => writeSavedReels(next))
            return next
        })
        setVideos((prev) => updateSavedVideoState(prev, reelId, optimisticSaved))

        try {
            const { isSaved, unlockedBadges } = await toggleSavedReel(reelId)

            if (isSaved !== optimisticSaved) {
                setVideos((prev) => updateSavedVideoState(prev, reelId, isSaved))
                setSaved((prev) => {
                    const next = { ...prev, [reelId]: isSaved }
                    queueMicrotask(() => writeSavedReels(next))
                    return next
                })
            }
            showUnlockedBadges(unlockedBadges, showToast)
        } catch (error) {
            setSaved((prev) => {
                const next = { ...prev, [reelId]: previousSaved }
                queueMicrotask(() => writeSavedReels(next))
                return next
            })
            setVideos((prev) => updateSavedVideoState(prev, reelId, previousSaved))
            console.error('Save request failed:', error)
        } finally {
            pendingActions.current.delete(actionKey)
        }
    }

    const handleMuteToggle = (reelId) => {
        setMutedReels((prev) => ({
            ...prev,
            [reelId]: !prev[reelId],
        }))
    }

    return {
        handleFollow,
        handleLikeClick,
        handleSaveClick,
        handleMuteToggle,
    }
}
