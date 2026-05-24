import { Link } from 'react-router-dom'

function ReelCreatorInfo({ layout, creatorId, creator, followed, onFollow }) {
    const isMobile = layout === 'mobile'

    const avatarClass = isMobile
        ? 'h-10 w-10 shrink-0 rounded-full border border-white/35 object-cover'
        : 'h-9 w-9 shrink-0 rounded-full object-cover'

    const nameClass = isMobile
        ? 'truncate text-[15px] font-semibold text-white'
        : 'truncate text-sm font-semibold leading-tight text-white'

    const followClass = isMobile
        ? `pointer-events-auto relative z-20 h-8 min-w-[78px] rounded-lg border px-3 text-xs font-semibold transition-all ${
              followed
                  ? 'border-white bg-white text-black'
                  : 'border-white/70 bg-transparent text-white backdrop-blur-sm'
          }`
        : `pointer-events-auto relative z-20 h-8 min-w-[40px] rounded-2xl border px-3 text-[11px] leading-none transition-all ${
              followed
                  ? 'border-white bg-white text-black'
                  : 'border-white/75 bg-white/10 text-white backdrop-blur-sm'
          }`

    const creatorContent = creatorId ? (
        <Link
            to={`/creator/${creatorId}`}
            onClick={(event) => event.stopPropagation()}
            className="pointer-events-auto flex min-w-0 items-center gap-3"
        >
            <img src={creator.avatar} alt={creator.name} className={avatarClass} />
            <p className={nameClass}>{creator.name}</p>
        </Link>
    ) : (
        <>
            <img
                src={creator.avatar}
                alt={creator.name}
                className={`pointer-events-none ${avatarClass}`}
            />
            <p className={`pointer-events-none ${nameClass}`}>{creator.name}</p>
        </>
    )

    return (
        <div className={`flex items-center gap-3 ${isMobile ? 'mb-3' : ''}`}>
            {creatorContent}
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation()
                    onFollow(creatorId)
                }}
                className={followClass}
            >
                {followed ? 'Following' : 'Follow'}
            </button>
        </div>
    )
}

export default ReelCreatorInfo
