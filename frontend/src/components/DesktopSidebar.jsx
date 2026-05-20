import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DesktopSidebar({ canCreate, onCreateClick, themeMode, onToggleTheme }) {
    const { pathname } = useLocation();
    const role = localStorage.getItem('scs_role');
    const profilePath = role === 'food_partner' ? '/food-partner/profile' : '/user/profile';

    const tabs = [
        {
            name: 'Home',
            path: '/',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            ),
        },
        {
            name: 'Search',
            path: '/search',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            ),
        },
        {
            name: 'Saved',
            path: '/saved',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            ),
        },
        {
            name: 'Messages',
            path: '/messages',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.24.364.466.037.892.281 1.153.671L12 21l2.65-3.978c.26-.39.687-.634 1.153-.67 1.091-.086 2.171-.208 3.24-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            ),
        },
        {
            name: 'Profile',
            path: profilePath,
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            ),
        },
    ];

    return (
        <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[86px] bg-[var(--color-sidebar-bg)] border-r border-[var(--color-navbar-border)] z-40 flex-col items-center py-6">
            <div className="mb-8">
                <div className="w-11 h-11 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] text-sm font-bold">
                    SCS
                </div>
            </div>

            <nav className="flex-1 flex flex-col items-center gap-3">
                {tabs.map((tab) => {
                    const isActive = tab.path === '/messages' ? pathname.startsWith('/messages') : pathname === tab.path;

                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            title={tab.name}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                isActive ? 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill={isActive ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                                {tab.icon}
                            </svg>
                        </Link>
                    );
                })}

                {canCreate && (
                    <button
                        type="button"
                        title="Create"
                        onClick={onCreateClick}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5v13m6.5-6.5h-13" />
                        </svg>
                    </button>
                )}
            </nav>

            <div className="flex flex-col items-center gap-3">
                <button
                    type="button"
                    title="Toggle theme"
                    onClick={onToggleTheme}
                    className="w-12 h-12 rounded-2xl border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] transition-colors flex items-center justify-center"
                >
                    {themeMode === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v1.5m0 13.5v1.5M5.636 5.636l1.06 1.06m9.608 9.608 1.06 1.06M3.75 12h1.5m13.5 0h1.5M5.636 18.364l1.06-1.06m9.608-9.608 1.06-1.06M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                        </svg>
                    )}
                </button>

            </div>
        </aside>
    );
}
