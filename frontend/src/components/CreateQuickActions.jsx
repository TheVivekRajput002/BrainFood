import { BookOpenText, ChevronRight, Video } from 'lucide-react'

const CREATE_OPTIONS = [
    {
        key: 'reel',
        label: 'Reel',
        description: 'Share a new short-form video post.',
        icon: Video,
    },
    {
        key: 'stack',
        label: 'Stack',
        description: 'Publish a new stack with book insights.',
        icon: BookOpenText,
    },
]

export default function CreateQuickActions({ isOpen, onClose, onSelect }) {
    if (!isOpen) {
        return null
    }

    return (
        <>
            <button
                type="button"
                aria-label="Close create menu"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-[var(--color-backdrop)]/60 md:bg-transparent"
            />

            <div className="fixed inset-x-4 bottom-24 z-50 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-[var(--shadow-lg)] md:inset-x-auto md:bottom-8 md:left-[104px] md:w-[320px]">
                <div className="px-3 pb-3 pt-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Creator Studio
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">
                        What do you want to create?
                    </h2>
                </div>

                <div className="space-y-2">
                    {CREATE_OPTIONS.map((option) => {
                        const Icon = option.icon

                        return (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => onSelect(option.key)}
                                className="flex w-full items-center gap-4 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-left transition hover:bg-[var(--color-hover)]"
                            >
                                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                        {option.label}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                                        {option.description}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-[var(--color-text-muted)]" />
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
