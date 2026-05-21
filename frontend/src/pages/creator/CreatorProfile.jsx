import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Check,
    ImageUp,
    Mail,
    MapPin,
    PencilLine,
    Phone,
    X,
} from 'lucide-react'

const PROFILE_TASKS = [
    { key: 'name', label: 'Business name', weight: 15 },
    { key: 'email', label: 'Email address', weight: 10 },
    { key: 'phone', label: 'Phone number', weight: 10 },
    { key: 'address', label: 'Location', weight: 20 },
    { key: 'bio', label: 'Biography', weight: 15 },
    { key: 'profile_picture', label: 'Profile photo', weight: 10 },
    { key: 'followers', label: 'Meals listed', weight: 10 },
    { key: 'customerServed', label: 'Customer reach', weight: 10 },
]

function ProfileField({ icon, label, value }) {
    const Icon = icon

    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-[var(--color-text-primary)]">
                {value || 'Not added yet'}
            </p>
        </div>
    )
}

function CompletionRing({ progress }) {
    const angle = Math.min(Math.max(progress, 0), 100) * 3.6

    return (
        <div
            className="relative grid h-36 w-36 place-items-center rounded-full"
            style={{
                background: `conic-gradient(var(--color-accent) 0deg ${angle}deg, var(--color-lightgray) ${angle}deg 360deg)`,
            }}
        >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--color-card)] text-center">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">{progress}%</span>
            </div>
        </div>
    )
}

function formatCompactNumber(value) {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`
    }

    return `${value}`
}

export default function CreatorProfile() {
    const [profile, setProfile] = useState(null)
    const [draftProfile, setDraftProfile] = useState(null)
    const [reelCount, setReelCount] = useState(0)
    const [editingSection, setEditingSection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
    const [photoPreview, setPhotoPreview] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/creator/profile`, { withCredentials: true })
            .then((response) => {
                const creator = response.data?.creator

                if (!creator) {
                    setError('Creator profile could not be loaded.')
                    setLoading(false)
                    return
                }

                setProfile(creator)
                setDraftProfile(creator)
                setReelCount(Array.isArray(response.data?.reels) ? response.data.reels.length : 0)
                setLoading(false)
            })
            .catch((fetchError) => {
                console.error('Error fetching creator profile', fetchError)
                setError('Creator profile could not be loaded.')
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview)
            }
        }
    }, [photoPreview])

    const completedWeight = PROFILE_TASKS.reduce((sum, task) => {
        const value = draftProfile?.[task.key]
        return value ? sum + task.weight : sum
    }, 0)

    const completionData = {
        progress: Math.min(100, completedWeight),
        items: PROFILE_TASKS.map((task) => ({
            ...task,
            isComplete: Boolean(draftProfile?.[task.key]),
        })),
    }

    const followersCount = Number(draftProfile?.followersCount) || 0
    const customerServed = Number(draftProfile?.customerServed) || 0
    const customerLabel = formatCompactNumber(customerServed)
    const creatorName = draftProfile?.name || 'Your food brand'
    const creatorImage = draftProfile?.profile_picture || 'https://i.pinimg.com/736x/f5/47/d8/f547d800625af9056d62efe8969aeea0.jpg'
    const stats = [
        { label: 'Followers', value: followersCount },
        { label: 'Reach', value: customerLabel },
        { label: 'Posts', value: reelCount },
    ]

    const handleAvatarChange = async (event) => {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview)
        }

        const nextPreview = URL.createObjectURL(file)
        setPhotoPreview(nextPreview)
        setDraftProfile((current) => (
            current
                ? { ...current, profile_picture: nextPreview }
                : current
        ))

        try {
            setIsUploadingPhoto(true)
            const formData = new FormData()
            formData.append('image', file)

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/creator/profile-picture`,
                formData,
                { withCredentials: true }
            )

            const nextProfilePicture =
                response.data?.profile_picture ||
                response.data?.creator?.profile_picture ||
                nextPreview

            setProfile((current) => (
                current
                    ? { ...current, profile_picture: nextProfilePicture }
                    : current
            ))
            setDraftProfile((current) => (
                current
                    ? { ...current, profile_picture: nextProfilePicture }
                    : current
            ))
        } catch (uploadError) {
            console.error('Creator profile picture upload failed:', uploadError.response?.data || uploadError.message)
        } finally {
            setIsUploadingPhoto(false)
            event.target.value = ''
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setDraftProfile((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleSaveSection = () => {
        setProfile(draftProfile)
        setEditingSection(null)
    }

    const handleCancelSection = () => {
        setDraftProfile(profile)
        setEditingSection(null)
    }

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/creator/logout`, { withCredentials: true })
            localStorage.removeItem('scs_auth')
            navigate('/creator/login')
        } catch (errorLogMsg) {
            console.error('Creator logout failed', errorLogMsg)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-bg)]">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
            </div>
        )
    }

    if (!draftProfile) {
        return (
            <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-bg)] px-6 text-center">
                <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-card)]">
                    <p className="text-base font-semibold text-[var(--color-text-primary)]">
                        {error || 'Creator profile is not available right now.'}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[100dvh] bg-[var(--color-bg)] px-4 py-6 text-[var(--color-text-primary)] md:px-6 md:py-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                    <main className="space-y-6">
                        <section className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                            <div className="relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
                                <div className="absolute inset-x-0 top-0 h-28 bg-[var(--gradient-hero)] opacity-10" />
                                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                        <img
                                            src={creatorImage}
                                            alt={draftProfile.name || 'Creator profile'}
                                            className="h-24 w-24 rounded-full object-cover"
                                        />

                                        <div className="space-y-2">
                                        
                                            <div>
                                                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                                    {creatorName}
                                                </h1>
                                                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                                                    Shape a profile that helps customers trust your kitchen faster.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 md:min-w-[260px]">
                                        <div className="flex flex-col gap-3">
                                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-surface-raised)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-hover)]">
                                                <ImageUp className="h-4 w-4 text-[var(--color-primary)]" />
                                                {isUploadingPhoto ? 'Uploading...' : 'Upload new photo'}
                                                <input
                                                    type="file"
                                                    accept="image/png,image/jpeg"
                                                    onChange={handleAvatarChange}
                                                    disabled={isUploadingPhoto}
                                                    className="hidden"
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm font-semibold text-[var(--color-danger)] transition hover:bg-[var(--color-hover)]"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-4 md:grid-cols-3">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-[var(--shadow-xs)]"
                                >
                                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">{item.label}</p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </section>

                        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] md:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">Personal Info</h2>
                                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                                        Core details customers and the platform use to identify your business.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditingSection(editingSection === 'info' ? null : 'info')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-hover)]"
                                >
                                    <PencilLine className="h-4 w-4" />
                                    {editingSection === 'info' ? 'Close' : 'Edit'}
                                </button>
                            </div>

                            {editingSection === 'info' ? (
                                <div className="mt-6">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <label className="block">
                                            <span className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Full Name</span>
                                            <input
                                                type="text"
                                                name="name"
                                                value={draftProfile.name || ''}
                                                onChange={handleInputChange}
                                                className="w-full rounded-2xl border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 py-3 outline-none transition focus:border-[var(--color-input-focus)] focus:ring-4 focus:ring-[var(--color-focus-ring)]"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Email</span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={draftProfile.email || ''}
                                                onChange={handleInputChange}
                                                className="w-full rounded-2xl border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 py-3 outline-none transition focus:border-[var(--color-input-focus)] focus:ring-4 focus:ring-[var(--color-focus-ring)]"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Phone</span>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={draftProfile.phone || ''}
                                                onChange={handleInputChange}
                                                className="w-full rounded-2xl border border-[var(--color-input-border)] bg-[var(--color-input-bg)] px-4 py-3 outline-none transition focus:border-[var(--color-input-focus)] focus:ring-4 focus:ring-[var(--color-focus-ring)]"
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={handleSaveSection}
                                            className="rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
                                        >
                                            Save changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelSection}
                                            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-hover)]"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    <ProfileField icon={MapPin} label="Profession" value={draftProfile.Profession} />
                                    <ProfileField icon={Mail} label="Email" value={draftProfile.email} />
                                    <ProfileField icon={Phone} label="Phone" value={draftProfile.phone} />
                                </div>
                            )}
                        </section>

                    </main>

                    <aside className="space-y-6">
                        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-6 shadow-[var(--shadow-card)] md:px-6">
                            <h2 className="text-xl font-bold tracking-tight">Complete your profile</h2>
                            <div className="mt-6 flex items-center justify-center">
                                <CompletionRing progress={completionData.progress} />
                            </div>
                            <div className="mt-6 space-y-3">
                                {completionData.items.map((item) => (
                                    <div key={item.key} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`grid h-6 w-6 place-items-center rounded-full ${item.isComplete
                                                    ? 'bg-[var(--color-success-soft)] text-[var(--color-success)]'
                                                    : 'bg-[var(--color-lightgray)] text-[var(--color-text-muted)]'
                                                    }`}
                                            >
                                                {item.isComplete ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                                            </div>
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                {item.label}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-sm font-semibold ${item.isComplete
                                                ? 'text-[var(--color-success)]'
                                                : 'text-[var(--color-text-muted)]'
                                                }`}
                                        >
                                            {item.weight}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        
                    </aside>
                </div>
            </div>
        </div>
    )
}
