import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';

export default function Layout() {
    const navigate = useNavigate();
    const [themeMode, setThemeMode] = React.useState(() => {
        const savedTheme = localStorage.getItem('themeMode');
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const isFoodPartner = localStorage.getItem('scs_role') === 'food_partner';

    React.useEffect(() => {
        document.documentElement.style.colorScheme = themeMode;
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <DesktopSidebar
                canCreate={isFoodPartner}
                onCreateClick={() => navigate('/create-food')}
                themeMode={themeMode}
                onToggleTheme={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            />

            {/* The main content area grows to fill available space.
                On mobile, padding-bottom ensures content isn't hidden behind the fixed BottomNav.
                On MD breakpoint and up, padding is removed since BottomNav can be handled differently or hidden. */}
            <main className="min-h-screen overflow-y-auto pb-[60px] md:pb-0 md:pl-[86px]">
                <Outlet />
            </main>
            
            <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
                <BottomNav canCreate={isFoodPartner} onCreateClick={() => navigate('/create-food')} />
            </div>
        </div>
    );
}
