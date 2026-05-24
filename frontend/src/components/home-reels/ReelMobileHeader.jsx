function ReelMobileHeader() {
    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center px-4 pt-4 md:hidden">
            <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-semibold tracking-tight text-white">Reels</h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </div>
    )
}

export default ReelMobileHeader
