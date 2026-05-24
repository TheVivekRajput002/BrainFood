function ReelFeedPlaceholder({ variant, loadError }) {
    if (variant === 'loading') {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg)] px-6 text-center text-[var(--color-text-secondary)] md:h-full">
                Loading reels...
            </div>
        )
    }

    if (variant === 'error') {
        return (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg)] px-6 text-center md:h-full">
                <div className="max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-[var(--color-text-primary)] shadow-[var(--shadow-card)]">
                    <p className="text-lg font-semibold">Feed unavailable</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{loadError}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg)] px-6 text-center md:h-full">
            <div className="max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-[var(--color-text-primary)] shadow-[var(--shadow-card)]">
                <p className="text-lg font-semibold">No reels yet</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    The feed is connected, but there is no reel data to display yet.
                </p>
            </div>
        </div>
    )
}

export default ReelFeedPlaceholder
