import { useEffect } from 'react'
import Stack from '../../components/StackHead'
import axios from "axios"
import { useState } from 'react'

function normalizeStack(stack) {
    return {
        id: stack?._id || stack?.id,
        title: stack?.title || 'Untitled Stack',
        author: stack?.author || stack?.creator?.name || 'Creator',
        cover: stack?.coverImage || stack?.cover,
    }
}

export default function StackScroll() {

    const [stacks, setStacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/stack`, { withCredentials: true })
            .then(response => {
                const nextStacks = Array.isArray(response.data?.stack)
                    ? response.data.stack.map(normalizeStack)
                    : []

                setStacks(nextStacks)
                setLoadError('')
            })
            .catch(error => {
                console.log("error in fetching stack", error)
                setStacks([])
                setLoadError('Unable to load stacks right now.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-[var(--color-bg)] px-6 md:h-[100vh]">
                <div className="w-full max-w-md">
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--color-border)]">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--color-primary)]" />
                    </div>
                    <p className="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
                        Loading stacks...
                    </p>
                </div>
            </div>
        )
    }

    if (loadError) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-[var(--color-bg)] px-6 text-center md:h-[100vh]">
                <div className="max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-[var(--color-text-primary)] shadow-[var(--shadow-card)]">
                    <p className="text-lg font-semibold">Stacks unavailable</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{loadError}</p>
                </div>
            </div>
        )
    }

    if (!stacks.length) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-[var(--color-bg)] px-6 text-center md:h-[100vh]">
                <div className="max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-[var(--color-text-primary)] shadow-[var(--shadow-card)]">
                    <p className="text-lg font-semibold">No stacks yet</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                        The page is connected, but there is no stack data to display yet.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[100vh] w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)] md:h-[100vh]">
            <div className="h-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
                {stacks.map((stack) => (
                    <div
                        key={stack.id}
                        className="flex h-[100vh] py-8 snap-start snap-always items-center justify-center bg-[var(--color-bg)] md:h-[100dvh] "
                    >
                        <Stack
                            id={stack.id}
                            title={stack.title}
                            author={stack.author}
                            cover={stack.cover}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
