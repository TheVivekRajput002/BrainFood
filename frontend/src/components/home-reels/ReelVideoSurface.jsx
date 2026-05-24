import { Heart, Play } from 'lucide-react'
import ReelMobileHeader from './ReelMobileHeader'
import ReelCreatorInfo from './ReelCreatorInfo'
import ReelActionRail from './ReelActionRail'
import ReelMuteIcon from './ReelMuteIcon'

function ReelVideoSurface({
    reel,
    reelId,
    creatorId,
    creator,
    followed,
    liked,
    saved,
    isActiveReel,
    isPaused,
    isMuted,
    likeBursts,
    videoRefs,
    progressBarRefs,
    onReelTap,
    onVideoTimeUpdate,
    onFollow,
    onLike,
    onSave,
    onMuteToggle,
}) {
    return (
        <div className="relative h-full w-full max-h-none overflow-hidden rounded-none border-0 bg-black shadow-none md:max-h-[94dvh] md:w-auto md:aspect-[9/16] md:rounded-2xl md:border md:border-[var(--color-border)] md:shadow-[var(--shadow-lg)]">
            <video
                ref={(element) => {
                    if (element) {
                        videoRefs.current[reel._id] = element
                        return
                    }

                    delete videoRefs.current[reel._id]
                }}
                src={reel.video}
                aria-label={reel.name}
                className="h-full w-full object-cover"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                onTimeUpdate={(event) => onVideoTimeUpdate(reel._id, event)}
            />

            <button
                type="button"
                aria-label={isPaused ? 'Play reel' : 'Pause reel'}
                className="absolute inset-0 z-[15] cursor-pointer border-0 bg-transparent p-0"
                onClick={(event) => onReelTap(reel, event)}
            />

            {likeBursts
                .filter((burst) => burst.reelId === reelId)
                .map((burst) => (
                    <div
                        key={burst.id}
                        className="pointer-events-none absolute z-[16]"
                        style={{
                            left: burst.x,
                            top: burst.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                        aria-hidden
                    >
                        <Heart
                            className="home-reel-like-burst h-24 w-24 fill-[var(--color-like)] text-[var(--color-like)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
                            strokeWidth={0}
                            aria-hidden
                        />
                    </div>
                ))}

            {isActiveReel && isPaused && (
                <div
                    className="pointer-events-none absolute inset-0 z-[14] flex items-center justify-center"
                    aria-hidden
                >
                    <Play
                        className="h-20 w-20 fill-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                        strokeWidth={0}
                        aria-hidden
                    />
                </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-reel-overlay)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 via-black/20 to-transparent md:hidden" />

            <ReelMobileHeader />

            <div className="pointer-events-none absolute bottom-2 left-1 right-0 z-20 flex items-end justify-between gap-3 px-3 md:hidden">
                <div className="min-w-0 flex-1 pr-2">
                    <ReelCreatorInfo
                        layout="mobile"
                        creatorId={creatorId}
                        creator={creator}
                        followed={followed}
                        onFollow={onFollow}
                    />
                    <p className="pointer-events-none mb-3 line-clamp-2 text-sm leading-5 text-white drop-shadow-lg">
                        {reel.description}
                    </p>
                </div>

                <ReelActionRail
                    variant="mobile"
                    reel={reel}
                    liked={liked}
                    saved={saved}
                    muted={isMuted}
                    onLike={onLike}
                    onSave={onSave}
                    onMuteToggle={onMuteToggle}
                />
            </div>

            <div className="pointer-events-none absolute bottom-16 left-2 right-2 z-20 hidden md:block md:bottom-1 md:left-4 md:right-4">
                <ReelCreatorInfo
                    layout="desktop"
                    creatorId={creatorId}
                    creator={creator}
                    followed={followed}
                    onFollow={onFollow}
                />

                <div className="-mt-1 flex items-center justify-between gap-3">
                    <p className="pointer-events-none line-clamp-1 text-sm text-white drop-shadow-lg">
                        {creator.caption}
                        <span className="text-white/80"> ... more</span>
                    </p>
                    <button
                        type="button"
                        onClick={() => onMuteToggle(reel._id)}
                        aria-label={isMuted ? 'Unmute reel' : 'Mute reel'}
                        className="pointer-events-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-divider)] bg-[color:var(--color-backdrop)] text-white"
                    >
                        <ReelMuteIcon muted={isMuted} size="lg" />
                    </button>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-white/25">
                <div
                    ref={(element) => {
                        if (element) {
                            progressBarRefs.current[reelId] = element
                            return
                        }

                        delete progressBarRefs.current[reelId]
                    }}
                    className="h-full bg-white will-change-[width]"
                    style={{ width: '0%' }}
                />
            </div>
        </div>
    )
}

export default ReelVideoSurface
