import { useToast } from '../../context/ToastContext'
import ReelFeedPlaceholder from './ReelFeedPlaceholder'
import ReelItem from './ReelItem'
import { useReelFeed } from './useReelFeed'
import { useReelActions } from './useReelActions'
import { useReelGestures } from './useReelGestures'

function HomeReels() {
    const { showToast } = useToast()

    const feed = useReelFeed(showToast)

    const actions = useReelActions({
        showToast,
        liked: feed.liked,
        setLiked: feed.setLiked,
        saved: feed.saved,
        setSaved: feed.setSaved,
        isFollowing: feed.isFollowing,
        setIsFollowing: feed.setIsFollowing,
        setMutedReels: feed.setMutedReels,
        setVideos: feed.setVideos,
    })

    const gestures = useReelGestures({
        liked: feed.liked,
        handleLikeClick: actions.handleLikeClick,
        activeReelId: feed.activeReelId,
        videoRefs: feed.videoRefs,
        setPausedReels: feed.setPausedReels,
    })

    if (feed.loading) {
        return <ReelFeedPlaceholder variant="loading" />
    }

    if (feed.loadError) {
        return <ReelFeedPlaceholder variant="error" loadError={feed.loadError} />
    }

    if (!feed.videos.length) {
        return <ReelFeedPlaceholder variant="empty" />
    }

    return (
        <div
            ref={feed.scrollContainerRef}
            className="h-full w-full snap-y snap-mandatory overflow-x-hidden overflow-y-auto bg-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:h-full md:bg-[var(--color-bg)]"
        >
            {feed.videos.map((reel) => (
                <ReelItem
                    key={reel._id}
                    reel={reel}
                    activeReelId={feed.activeReelId}
                    pausedReels={feed.pausedReels}
                    mutedReels={feed.mutedReels}
                    liked={feed.liked}
                    saved={feed.saved}
                    isFollowing={feed.isFollowing}
                    likeBursts={gestures.likeBursts}
                    reelRefs={feed.reelRefs}
                    videoRefs={feed.videoRefs}
                    progressBarRefs={feed.progressBarRefs}
                    onReelTap={gestures.handleReelTap}
                    onVideoTimeUpdate={feed.handleVideoTimeUpdate}
                    onFollow={actions.handleFollow}
                    onLike={actions.handleLikeClick}
                    onSave={actions.handleSaveClick}
                    onMuteToggle={actions.handleMuteToggle}
                />
            ))}

            {feed.hasMore && (
                <div
                    ref={feed.loadMoreSentinelRef}
                    className="flex h-8 w-full shrink-0 snap-none items-center justify-center"
                    aria-hidden
                >
                    {feed.loadingMore && (
                        <span className="text-xs text-white/60 md:text-[var(--color-text-secondary)]">
                            Loading more...
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default HomeReels
