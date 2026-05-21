import { useEffect, useState } from 'react'
import axios from 'axios'
import { Eye, Film, Heart, MessageCircle, Play, X } from 'lucide-react'

function formatCount(value) {
    const count = Number(value) || 0

    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`
    }

    if (count >= 1000) {
        return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    }

    return `${count}`
}

export default function CreatorReels() {
    const [reels, setReels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedReel, setSelectedReel] = useState(null)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/creator/profile`, { withCredentials: true })
            .then((response) => {
                setReels(Array.isArray(response.data?.reels) ? response.data.reels : [])
                setLoading(false)
            })
            .catch((fetchError) => {
                console.error('Error fetching creator reels', fetchError)
                setError('Creator reels could not be loaded.')
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!selectedReel) {
            return undefined
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelectedReel(null)
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedReel])

    if (loading) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-bg)]">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-bg)] px-6 text-center">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-card)]">
                    <p className="text-base font-semibold text-[var(--color-text-primary)]">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[100dvh] bg-[var(--color-bg)] px-4 py-6 text-[var(--color-text-primary)] md:px-6 md:py-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                            <Film className="h-4 w-4 text-[var(--color-primary)]" />
                            Creator Reels
                        </div>
                        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                            All uploaded reels
                        </h1>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                            Review every reel you have published and open any one in a player window.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-right shadow-[var(--shadow-xs)]">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                            Total reels
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                            {reels.length}
                        </p>
                    </div>
                </div>

                {reels.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
                        {reels.map((reel) => (
                            <button
                                key={reel._id}
                                type="button"
                                onClick={() => setSelectedReel(reel)}
                                className="group w-[220px]  overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] text-left shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
                            >
                                <div className="relative  aspect-[9/16] overflow-hidden bg-[var(--color-surface)]">
                                    <img
                                        src={reel.thumbnail || 'https://i.pinimg.com/736x/f5/47/d8/f547d800625af9056d62efe8969aeea0.jpg'}
                                        alt={reel.name || 'Creator reel'}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                    <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                                        <Play className="h-4 w-4 fill-white text-white" />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 px-4 py-4 text-white">
                                        <p className="text-base font-semibold">
                                            {reel.name || 'Untitled reel'}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-sm text-white/80">
                                            {reel.description || 'No description added yet.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 px-4 py-4">
                                    <div className="grid grid-cols-3 gap-3 text-sm text-[var(--color-text-secondary)]">
                                        <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-surface-raised)] px-3 py-3">
                                            <Heart className="h-4 w-4 text-[var(--color-like)]" />
                                            <div>
                                                <p className="font-semibold text-[var(--color-text-primary)]">{formatCount(reel.likeCount)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-surface-raised)] px-3 py-3">
                                            <MessageCircle className="h-4 w-4 text-[var(--color-primary)]" />
                                            <div>
                
                                                <p className="font-semibold text-[var(--color-text-primary)]">{formatCount(reel.comments)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-2xl bg-[var(--color-surface-raised)] px-3 py-3">
                                            <Eye className="h-4 w-4 text-[var(--color-accent)]" />
                                            <div>
                                               
                                                <p className="font-semibold text-[var(--color-text-primary)]">{formatCount(reel.views)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 rounded-[28px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-5 py-12 text-center">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                            No reels yet
                        </p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                            Your uploaded reels will appear here once you publish them.
                        </p>
                    </div>
                )}
            </div>

            {selectedReel ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
                    onClick={() => setSelectedReel(null)}
                >
                    <div
                        className="relative w-full max-w-sm overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedReel(null)}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
                            aria-label="Close reel preview"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <video
                            key={selectedReel._id}
                            src={selectedReel.video}
                            poster={selectedReel.thumbnail}
                            className="aspect-[9/16] w-full bg-black object-cover"
                            controls
                            autoPlay
                            playsInline
                        />

                        <div className="space-y-2 bg-[var(--color-card)] px-5 py-4">
                            <p className="text-base font-semibold text-[var(--color-text-primary)]">
                                {selectedReel.name || 'Creator reel'}
                            </p>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                {selectedReel.description || 'Fresh from your reel library.'}
                            </p>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                <div className="rounded-2xl bg-[var(--color-surface-raised)] px-3 py-2">
                                    <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Likes</p>
                                    <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                                        {formatCount(selectedReel.likeCount)}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-[var(--color-surface-raised)] px-3 py-2">
                                    <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Comments</p>
                                    <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                                        {formatCount(selectedReel.comments)}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-[var(--color-surface-raised)] px-3 py-2">
                                    <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Views</p>
                                    <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                                        {formatCount(selectedReel.views)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
