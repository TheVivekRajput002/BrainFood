function ReelMuteIcon({ muted, size = 'sm' }) {
    const className = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

    if (muted) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.9}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 8.25 5.25 7.5m0-7.5-5.25 7.5" />
            </svg>
        )
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.9}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 9.75a4.5 4.5 0 0 1 0 4.5m2.25-6.75a7.5 7.5 0 0 1 0 9"
            />
        </svg>
    )
}

export default ReelMuteIcon
