import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AlertCircle, BookOpenText, Plus } from 'lucide-react'
import Stack from '../../components/StackHead'

function normalizeStack(stack) {
    return {
        id: stack?._id || stack?.id,
        title: stack?.title || 'Untitled Stack',
        author: stack?.author || stack?.creator?.name || 'Creator',
        cover: stack?.coverImage || stack?.cover,
    }
}

function StackStatusCard({ icon: Icon, title, description, action }) {
    return (
        <div className="w-full max-w-md rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center shadow-[var(--shadow-card)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <Icon className="h-7 w-7" aria-hidden />
            </div>
            <p className="mt-5 text-lg font-semibold text-[var(--color-text-primary)]">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {description}
            </p>
            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    )
}

function StackLoading() {
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

export default function StackScroll() {
    const navigate = useNavigate()
    const isCreator = localStorage.getItem('scs_role') === 'creator'
    const [stacks, setStacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/stack`, { withCredentials: true })
            .then((response) => {
                const nextStacks = Array.isArray(response.data?.stack)
                    ? response.data.stack.map(normalizeStack)
                    : []

                setStacks(nextStacks)
                setLoadError('')
            })
            .catch((error) => {
                console.log('error in fetching stack', error)
                setStacks([])
                setLoadError('Unable to load stacks right now.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <StackLoading />
    }

    if (loadError) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-[var(--color-bg)] px-6 md:h-[100vh]">
                <StackStatusCard
                    icon={AlertCircle}
                    title="Stacks unavailable"
                    description={loadError}
                />
            </div>
        )
    }

    if (!stacks.length) {
        return (
            <div className="flex h-[100dvh] w-full items-center justify-center bg-[var(--color-bg)] px-6 md:h-[100vh]">
                <StackStatusCard
                    icon={BookOpenText}
                    title="No stacks yet"
                    description="Book insights will appear here once creators publish their first stack."
                    action={
                        isCreator ? (
                            <button
                                type="button"
                                onClick={() => navigate('/stack/create')}
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
                            >
                                <Plus className="h-4 w-4" aria-hidden />
                                Create a stack
                            </button>
                        ) : null
                    }
                />
            </div>
        )
    }

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)] md:h-[100vh]">
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-soft)_0%,_transparent_55%)]"
                aria-hidden
            />

            <div className="relative h-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth">
                {stacks.map((stack) => (
                    <div
                        key={stack.id}
                        className="flex h-[100dvh] snap-start snap-always items-center justify-center px-4 pb-28 pt-10 md:h-[100vh] md:pb-32 md:pt-12"
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
