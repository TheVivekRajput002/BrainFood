import { getCreatorFromReel } from './reelUtils'
import ReelVideoSurface from './ReelVideoSurface'
import ReelActionRail from './ReelActionRail'

function ReelItem({
    reel,
    activeReelId,
    pausedReels,
    mutedReels,
    liked,
    saved,
    isFollowing,
    likeBursts,
    reelRefs,
    videoRefs,
    progressBarRefs,
    onReelTap,
    onVideoTimeUpdate,
    onFollow,
    onLike,
    onSave,
    onMuteToggle,
}) {
    const { creatorId, creator } = getCreatorFromReel(reel)
    const followed = !!isFollowing[creatorId]
    const reelId = String(reel._id)
    const isActiveReel = reelId === String(activeReelId)
    const isPaused = !!pausedReels[reelId]
    const isMuted = mutedReels[reel._id] === true

    return (
        <div
            ref={(element) => {
                if (element) {
                    reelRefs.current[reel._id] = element
                    return
                }

                delete reelRefs.current[reel._id]
            }}
            data-reel-id={reel._id}
            className="relative flex h-full w-full snap-center snap-always items-center justify-center px-0 pt-0 md:h-full md:px-6 md:pt-7"
        >
            <div className="flex h-full w-full max-w-none items-center justify-center gap-0 md:h-[92dvh] md:max-w-[940px] md:gap-6">
                <ReelVideoSurface
                    reel={reel}
                    reelId={reelId}
                    creatorId={creatorId}
                    creator={creator}
                    followed={followed}
                    liked={liked}
                    saved={saved}
                    isActiveReel={isActiveReel}
                    isPaused={isPaused}
                    isMuted={isMuted}
                    likeBursts={likeBursts}
                    videoRefs={videoRefs}
                    progressBarRefs={progressBarRefs}
                    onReelTap={onReelTap}
                    onVideoTimeUpdate={onVideoTimeUpdate}
                    onFollow={onFollow}
                    onLike={onLike}
                    onSave={onSave}
                    onMuteToggle={onMuteToggle}
                />

                <ReelActionRail
                    variant="desktop"
                    reel={reel}
                    liked={liked}
                    saved={saved}
                    muted={isMuted}
                    onLike={onLike}
                    onSave={onSave}
                    onMuteToggle={onMuteToggle}
                />
            </div>
        </div>
    )
}

export default ReelItem
