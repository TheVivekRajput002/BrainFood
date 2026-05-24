import { useEffect, useRef, useState } from 'react'
import { DOUBLE_TAP_MS } from './reelUtils'

export function useReelGestures({
    liked,
    handleLikeClick,
    activeReelId,
    videoRefs,
    setPausedReels,
}) {
    const lastTapRef = useRef({ reelId: null, time: 0 })
    const tapTimerRef = useRef(null)
    const [likeBursts, setLikeBursts] = useState([])

    useEffect(() => {
        return () => {
            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current)
            }
        }
    }, [])

    const showLikeBurst = (reelId, event) => {
        const target = event.currentTarget
        const rect = target.getBoundingClientRect()
        const id = `${reelId}-${Date.now()}`

        setLikeBursts((prev) => [
            ...prev,
            {
                id,
                reelId: String(reelId),
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            },
        ])

        window.setTimeout(() => {
            setLikeBursts((prev) => prev.filter((burst) => burst.id !== id))
        }, 800)
    }

    const handleReelTogglePlay = (reelId) => {
        const reelKey = String(reelId)

        if (reelKey !== String(activeReelId)) {
            return
        }

        const videoElement = videoRefs.current[reelId] || videoRefs.current[reelKey]

        if (!videoElement) {
            return
        }

        const willPause = !videoElement.paused

        setPausedReels((prev) => ({
            ...prev,
            [reelKey]: willPause,
        }))

        if (willPause) {
            videoElement.pause()
            return
        }

        const playPromise = videoElement.play()

        if (playPromise?.catch) {
            playPromise.catch(() => {})
        }
    }

    const handleReelTap = (reel, event) => {
        const reelId = String(reel._id)
        const now = Date.now()
        const isDoubleTap =
            lastTapRef.current.reelId === reelId &&
            now - lastTapRef.current.time < DOUBLE_TAP_MS

        if (isDoubleTap) {
            if (tapTimerRef.current) {
                clearTimeout(tapTimerRef.current)
                tapTimerRef.current = null
            }

            lastTapRef.current = { reelId: null, time: 0 }
            showLikeBurst(reelId, event)

            if (!liked[reel._id]) {
                handleLikeClick(reel)
            }

            return
        }

        lastTapRef.current = { reelId, time: now }

        if (tapTimerRef.current) {
            clearTimeout(tapTimerRef.current)
        }

        tapTimerRef.current = window.setTimeout(() => {
            tapTimerRef.current = null
            lastTapRef.current = { reelId: null, time: 0 }
            handleReelTogglePlay(reel._id)
        }, DOUBLE_TAP_MS)
    }

    return {
        likeBursts,
        handleReelTap,
    }
}
