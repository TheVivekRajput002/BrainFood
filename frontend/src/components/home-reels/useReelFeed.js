import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { showUnlockedBadges } from '../../utils/badgeToasts'
import {
    buildInitialFollowState,
} from '../../utils/creatorFollow'
import {
    buildInitialLikedState,
} from '../../utils/reelLike'
import {
    buildInitialSavedState,
} from '../../utils/reelSave'
import {
    mergeUniqueReels,
    REEL_PAGE_LIMIT,
    WATCH_COMPLETE_THRESHOLD,
} from './reelUtils'

export function useReelFeed(showToast) {
    const [videos, setVideos] = useState([])
    const [liked, setLiked] = useState({})
    const [saved, setSaved] = useState({})
    const [isFollowing, setIsFollowing] = useState({})
    const [mutedReels, setMutedReels] = useState({})
    const [pausedReels, setPausedReels] = useState({})
    const [activeReelId, setActiveReelId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadError, setLoadError] = useState('')
    const [nextCursor, setNextCursor] = useState(null)
    const [hasMore, setHasMore] = useState(false)

    const reelRefs = useRef({})
    const videoRefs = useRef({})
    const progressBarRefs = useRef({})
    const progressRafRef = useRef(null)
    const scrollContainerRef = useRef(null)
    const loadMoreSentinelRef = useRef(null)
    const loadingMoreRef = useRef(false)
    const watchedReelsReported = useRef(new Set())

    const setProgressBarWidth = (reelId, percent) => {
        const fill = progressBarRefs.current[String(reelId)]

        if (fill) {
            fill.style.width = `${percent}%`
        }
    }

    const markReelWatched = (reelId) => {
        const id = String(reelId)
        if (!id || watchedReelsReported.current.has(id)) {
            return
        }

        watchedReelsReported.current.add(id)

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/api/reel/${id}/watch`,
                {},
                { withCredentials: true }
            )
            .then((response) => {
                showUnlockedBadges(response.data?.unlockedBadges, showToast)
            })
            .catch((error) => {
                watchedReelsReported.current.delete(id)
                console.log('reel watch tracking skipped', error)
            })
    }

    const handleVideoTimeUpdate = (reelId, event) => {
        const reelKey = String(reelId)
        const video = event.currentTarget
        const { currentTime, duration } = video

        if (!duration || !Number.isFinite(duration)) {
            return
        }

        if (reelKey !== String(activeReelId)) {
            return
        }

        if (currentTime / duration < WATCH_COMPLETE_THRESHOLD) {
            return
        }

        markReelWatched(reelId)
    }

    const applyReelBatch = useCallback((reels, { append = false } = {}) => {
        if (!append) {
            setActiveReelId(reels[0]?._id ? String(reels[0]._id) : null)
        }

        setVideos((prev) => (append ? mergeUniqueReels(prev, reels) : reels))

        setIsFollowing((prev) => ({ ...prev, ...buildInitialFollowState(reels) }))
        setLiked((prev) => ({ ...prev, ...buildInitialLikedState(reels) }))
        setSaved((prev) => ({ ...prev, ...buildInitialSavedState(reels) }))
        setMutedReels((prev) => ({
            ...prev,
            ...reels.reduce((state, reel) => {
                if (reel?._id) {
                    state[reel._id] = prev[reel._id] ?? false
                }

                return state
            }, {}),
        }))
    }, [])

    const fetchReelPage = useCallback(async ({ cursor = null, append = false } = {}) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reel/`, {
            params: {
                limit: REEL_PAGE_LIMIT,
                ...(cursor ? { cursor } : {}),
            },
            withCredentials: true,
        })

        const reels = response.data.reel || []

        applyReelBatch(reels, { append })
        setNextCursor(response.data.nextCursor ?? null)
        setHasMore(!!response.data.hasMore)
        setLoadError('')

        return reels
    }, [applyReelBatch])

    const loadMoreReels = useCallback(async () => {
        if (!hasMore || !nextCursor || loadingMoreRef.current) {
            return
        }

        loadingMoreRef.current = true
        setLoadingMore(true)

        try {
            await fetchReelPage({ cursor: nextCursor, append: true })
        } catch (error) {
            console.error('Failed to load more reels:', error)
        } finally {
            loadingMoreRef.current = false
            setLoadingMore(false)
        }
    }, [fetchReelPage, hasMore, nextCursor])

    useEffect(() => {
        fetchReelPage()
            .catch((error) => {
                console.error('Failed to load reels:', error)
                setVideos([])
                setNextCursor(null)
                setHasMore(false)
                setLoadError(
                    'Unable to load reels. Check that the backend is running and VITE_API_URL is correct.'
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [fetchReelPage])

    useEffect(() => {
        if (loading || !hasMore || !nextCursor) {
            return undefined
        }

        const sentinel = loadMoreSentinelRef.current
        const root = scrollContainerRef.current

        if (!sentinel || !root) {
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    loadMoreReels()
                }
            },
            {
                root,
                rootMargin: '200px 0px',
                threshold: 0,
            }
        )

        observer.observe(sentinel)

        return () => observer.disconnect()
    }, [hasMore, loadMoreReels, loading, nextCursor, videos.length])

    useEffect(() => {
        if (!videos.length) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (firstEntry, secondEntry) =>
                            secondEntry.intersectionRatio - firstEntry.intersectionRatio
                    )

                if (visibleEntries.length > 0) {
                    const nextActiveReelId = visibleEntries[0].target.dataset.reelId

                    if (nextActiveReelId) {
                        setActiveReelId(String(nextActiveReelId))
                    }
                }
            },
            {
                threshold: [0.35, 0.6, 0.8],
            }
        )

        Object.values(reelRefs.current).forEach((reelElement) => {
            if (reelElement) {
                observer.observe(reelElement)
            }
        })

        return () => observer.disconnect()
    }, [videos])

    useEffect(() => {
        const activeId = activeReelId ? String(activeReelId) : null

        if (!activeId || pausedReels[activeId]) {
            return undefined
        }

        const tick = () => {
            const video =
                videoRefs.current[activeReelId] || videoRefs.current[activeId]
            const { currentTime, duration } = video || {}

            if (video && duration && Number.isFinite(duration)) {
                setProgressBarWidth(activeId, Math.min(100, (currentTime / duration) * 100))
            }

            progressRafRef.current = requestAnimationFrame(tick)
        }

        progressRafRef.current = requestAnimationFrame(tick)

        return () => {
            if (progressRafRef.current) {
                cancelAnimationFrame(progressRafRef.current)
                progressRafRef.current = null
            }
        }
    }, [activeReelId, pausedReels])

    useEffect(() => {
        const inactiveReelIds = []

        videos.forEach((reel) => {
            const videoElement = videoRefs.current[reel._id]

            if (!videoElement) {
                return
            }

            const reelId = String(reel._id)
            const isActiveReel = reelId === String(activeReelId)
            videoElement.muted = mutedReels[reel._id] === true

            if (isActiveReel) {
                if (pausedReels[reelId]) {
                    videoElement.pause()
                    return
                }

                const playPromise = videoElement.play()

                if (playPromise?.catch) {
                    playPromise.catch(() => {})
                }

                return
            }

            videoElement.pause()
            videoElement.currentTime = 0
            inactiveReelIds.push(reelId)
        })

        inactiveReelIds.forEach((reelId) => setProgressBarWidth(reelId, 0))
    }, [activeReelId, mutedReels, pausedReels, videos])

    useEffect(() => {
        const currentVideoRefs = videoRefs.current

        return () => {
            Object.values(currentVideoRefs).forEach((videoElement) => {
                videoElement?.pause()
            })
        }
    }, [])

    return {
        videos,
        setVideos,
        liked,
        setLiked,
        saved,
        setSaved,
        isFollowing,
        setIsFollowing,
        mutedReels,
        setMutedReels,
        pausedReels,
        setPausedReels,
        activeReelId,
        loading,
        loadingMore,
        loadError,
        hasMore,
        reelRefs,
        videoRefs,
        progressBarRefs,
        scrollContainerRef,
        loadMoreSentinelRef,
        handleVideoTimeUpdate,
    }
}
