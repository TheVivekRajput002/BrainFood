import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from '@posthog/react'

import App from './App.jsx'

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-01-30',
}

const savedTheme = localStorage.getItem('themeMode')
const resolvedTheme =
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

document.documentElement.style.colorScheme = resolvedTheme
document.documentElement.setAttribute('data-theme', resolvedTheme)

createRoot(document.getElementById('root')).render(

  <PostHogProvider apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN} options={options}>
    <App />
  </PostHogProvider>

)
