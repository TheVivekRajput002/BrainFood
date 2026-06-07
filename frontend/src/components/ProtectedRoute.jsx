import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem('scs_auth') === 'true';
    const role = localStorage.getItem('scs_role');

    if (!isAuthenticated) {
        const redirectPath = role === 'creator' ? '/creator/login' : '/user/login';
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}
