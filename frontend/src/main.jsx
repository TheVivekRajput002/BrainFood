import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

const savedTheme = localStorage.getItem('themeMode')
const resolvedTheme =
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

document.documentElement.style.colorScheme = resolvedTheme
document.documentElement.setAttribute('data-theme', resolvedTheme)

createRoot(document.getElementById('root')).render(
 
    <App />
 
)
