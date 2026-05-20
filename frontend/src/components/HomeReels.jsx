import React, { useEffect, useState } from 'react'
import axios from 'axios'

function HomeReels() {
    const [videos, setVideos] = useState([])
    const [liked, setLiked] = useState({})
    const [saved, setSaved] = useState({})
    const [isFollowing, setIsFollowing] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/reel/`, { withCredentials: true })
            .then(response => {
                const reels = response.data.reel || []
                setVideos(reels)

                const initialFollowing = {}
                reels.forEach((r) => {
                    const creatorId = r?.creator?._id || r?.creator || r?.creatorId
                    if (creatorId) {
                        initialFollowing[creatorId] = !!r.isFollowed
                    }
                })
                setIsFollowing(initialFollowing)
            })
    }, [])

    const toggleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const toggleSave = (id) => {
        setSaved(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const handleFollow = async (creatorId) => {
        if (!creatorId) return
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/creator/${creatorId}/follow`,
                {},
                {
                    withCredentials: true
                }
            )
            setIsFollowing((prev) => ({
                ...prev,
                [creatorId]: res.data.action === "followed"
            }))
        } catch (error) {
            console.error("Follow request failed:", error)
        }
    }

    async function likeVideo(reel) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reel/like`, { reelId: reel._id }, { withCredentials: true })

        if (response.data.like) {
            setVideos((prev) => prev.map((v) => v._id === reel._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        } else {
            setVideos((prev) => prev.map((v) => v._id === reel._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
    }

    async function bookmarkVideo(reel) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reel/bookmark`, { reelId: reel._id }, { withCredentials: true })

        if (response.data.save) {
            setVideos((prev) => prev.map((v) => v._id === reel._id ? { ...v, bookmarkCount: v.bookmarkCount + 1 } : v))
        } else {
            setVideos((prev) => prev.map((v) => v._id === reel._id ? { ...v, bookmarkCount: v.bookmarkCount - 1 } : v))
        }
    }

    
    return (
        <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll bg-[var(--color-bg)]">
            {videos.map((reel) => (
                <div
                key={reel._id}
                className="h-full w-full snap-center snap-always relative flex items-center justify-center px-3 pt-5 md:px-6 md:pt-7"
                >
                    {(() => {
                        const creatorId = reel?.creator?._id || reel?.creator || reel?.creatorId
                        const followed = !!isFollowing[creatorId]
                        const creator = {
                            name: reel.creatorName || "Sandeep Maheswari",
                            avatar: reel.creatorAvatar || "https://i.pravatar.cc/96?img=12",
                            caption: reel.caption || "Not imaginary situation"
                        }

                        return (
                            <div className="w-full max-w-[860px] md:max-w-[940px] h-[94dvh] md:h-[92dvh] flex items-center justify-center gap-3 md:gap-6">
                                <div className="relative h-full max-h-[94dvh] aspect-[9/16] w-auto rounded-xl md:rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black shadow-[var(--shadow-lg)]">
                                    <video
                                        src={reel.video}
                                        alt={reel.name}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 bg-[var(--gradient-reel-overlay)]"></div>

                                    <div className="absolute bottom-4 md:bottom-1 left-2 right-2 md:left-4 md:right-4 z-10">
                                        <div className="flex items-center gap-3">

                                            <img
                                                src={creator.avatar}
                                                alt={creator.name}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                            <p className="text-white text-sm font-semibold leading-tight truncate">
                                                {creator.name}
                                            </p>


                                            <button
                                                type="button"
                                                onClick={() => handleFollow(creatorId)}
                                                className={`relative z-20 pointer-events-auto h-8 min-w-[40px] rounded-2xl border border-1 text-[11px] leading-none px-3 transition-all ${followed
                                                    ? "bg-white text-black border-white"
                                                    : "bg-white/10 text-white border-white/75 backdrop-blur-sm"
                                                    }`}
                                            >
                                                {followed ? "Following" : "Follow"}
                                            </button>
                                        </div>

                                        <div className="-mt-1 flex items-center justify-between gap-3">
                                            <p className="text-white text-sm md:text-sm line-clamp-1 drop-shadow-lg">
                                                {creator.caption}
                                                <span className="text-white/80"> ... more</span>
                                            </p>
                                            <button className="h-8 w-8 rounded-full bg-[color:var(--color-backdrop)] border border-[color:var(--color-divider)] text-white flex items-center justify-center mb-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l4 6M19 9l-4 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-16 md:w-20 flex flex-col items-center justify-end gap-5 z-10 pb-10 md:pb-14">
                                    <button
                                        onClick={() => { toggleLike(reel._id); likeVideo(reel) }}
                                        className="flex flex-col items-center gap-1 group"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center group-hover:bg-[color:var(--color-scrim)] transition-all group-active:scale-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-colors ${liked[reel._id] ? 'text-[var(--color-like)] fill-[var(--color-like)]' : 'text-white'}`} fill={liked[reel._id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/90 text-xs md:text-sm font-medium">{reel.likeCount || 0}</span>
                                    </button>

                                    <button
                                        onClick={() => { toggleSave(reel._id); bookmarkVideo(reel) }}
                                        className="flex flex-col items-center gap-1 group"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center group-hover:bg-[color:var(--color-scrim)] transition-all group-active:scale-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-colors ${saved[reel._id] ? 'text-[var(--color-save)] fill-[var(--color-save)]' : 'text-white'}`} fill={saved[reel._id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/90 text-xs md:text-sm font-medium">{reel.bookmarkCount || 0}</span>
                                    </button>

                                    <button className="flex flex-col items-center gap-1 group">
                                        <div className="w-11 h-11 rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center group-hover:bg-[color:var(--color-scrim)] transition-all group-active:scale-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/90 text-xs md:text-sm font-medium">{reel.comments || 0}</span>
                                    </button>

                                    <button className="flex flex-col items-center gap-1 group">
                                        <div className="w-11 h-11 rounded-full bg-[color:var(--color-backdrop)] backdrop-blur-sm flex items-center justify-center group-hover:bg-[color:var(--color-scrim)] transition-all group-active:scale-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button className="flex items-center justify-center w-11 h-11 rounded-full bg-[color:var(--color-backdrop)] text-white text-3xl leading-none">...</button>
                                </div>
                            </div>
                        )
                    })()}
                </div>
            ))}
        </div>
    )
}

export default HomeReels
