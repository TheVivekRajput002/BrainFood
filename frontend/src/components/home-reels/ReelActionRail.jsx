import { formatCount } from './reelUtils'
import ReelMuteIcon from './ReelMuteIcon'

function ReelActionRail({
    variant,
    reel,
    liked,
    saved,
    muted,
    onLike,
    onSave,
    onMuteToggle,
}) {
    const isLiked = !!liked[reel._id]
    const isSaved = !!saved[reel._id]
    const isMuted = muted === true

    if (variant === 'mobile') {
        return (
            <div className="pointer-events-auto flex w-10 flex-col items-center justify-end gap-4">
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onLike(reel)
                    }}
                    className="flex flex-col items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-7 w-7 transition-colors ${isLiked ? 'fill-[var(--color-like)] text-[var(--color-like)]' : 'text-white'}`}
                        fill={isLiked ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                    <span className="text-[11px] font-medium text-white">
                        {formatCount(reel.likeCount)}
                    </span>
                </button>

                <button type="button" className="flex flex-col items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                    </svg>
                    <span className="text-[11px] font-medium text-white">
                        {formatCount(reel.comments)}
                    </span>
                </button>

                <button type="button" className="flex flex-col items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 -scale-x-100 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25 3.75 12m0 0 3.75 3.75M3.75 12h11.5a4.75 4.75 0 0 1 0 9.5H14.25"
                        />
                    </svg>
                    <span className="text-[11px] font-medium text-white">Share</span>
                </button>

                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onSave(reel)
                    }}
                    className="flex flex-col items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-7 w-7 transition-colors ${isSaved ? 'fill-[var(--color-save)] text-[var(--color-save)]' : 'text-white'}`}
                        fill={isSaved ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                    </svg>
                    <span className="text-[11px] font-medium text-white">
                        {formatCount(reel.bookmarkCount)}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => onMuteToggle(reel._id)}
                    aria-label={isMuted ? 'Unmute reel' : 'Mute reel'}
                    className="flex flex-col items-center gap-1"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm">
                        <ReelMuteIcon muted={isMuted} />
                    </div>
                </button>
            </div>
        )
    }

    return (
        <div className="hidden w-16 flex-col items-center justify-end gap-5 pb-10 md:flex md:w-20 md:pb-14">
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation()
                    onLike(reel)
                }}
                className="group flex flex-col items-center gap-1"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm transition-all group-active:scale-90 group-hover:bg-[color:var(--color-scrim)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-colors ${isLiked ? 'fill-[var(--color-like)] text-[var(--color-like)]' : 'text-white'}`}
                        fill={isLiked ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </div>
                <span className="text-xs font-medium text-white/90 md:text-sm">
                    {reel.likeCount || 0}
                </span>
            </button>

            <button type="button" className="group flex flex-col items-center gap-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm transition-all group-active:scale-90 group-hover:bg-[color:var(--color-scrim)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                    </svg>
                </div>
                <span className="text-xs font-medium text-white/90 md:text-sm">
                    {reel.comments || 0}
                </span>
            </button>

            <button type="button" className="group flex flex-col items-center gap-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm transition-all group-active:scale-90 group-hover:bg-[color:var(--color-scrim)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25 3.75 12m0 0 3.75 3.75M3.75 12h11.5a4.75 4.75 0 0 1 0 9.5H14.25"
                        />
                    </svg>
                </div>
                <span className="text-xs font-medium text-white/90 md:text-sm">Share</span>
            </button>

            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation()
                    onSave(reel)
                }}
                className="group flex flex-col items-center gap-1"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm transition-all group-active:scale-90 group-hover:bg-[color:var(--color-scrim)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-colors ${isSaved ? 'fill-[var(--color-save)] text-[var(--color-save)]' : 'text-white'}`}
                        fill={isSaved ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                    </svg>
                </div>
                <span className="text-xs font-medium text-white/90 md:text-sm">
                    {reel.bookmarkCount || 0}
                </span>
            </button>

            <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-backdrop)] text-3xl leading-none text-white"
            >
                ...
            </button>
        </div>
    )
}

export default ReelActionRail
