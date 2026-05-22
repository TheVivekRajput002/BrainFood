const DEFAULT_API_URL = 'http://localhost:3000'

export function getApiBaseUrl() {
    return import.meta.env.VITE_API_URL || DEFAULT_API_URL
}

/** Full URL to start Google OAuth (user accounts). */
export function getGoogleAuthHref(from = 'login') {
    const base = getApiBaseUrl().replace(/\/$/, '')
    const query = from === 'register' ? '?from=register' : ''
    return `${base}/api/auth/google${query}`
}
