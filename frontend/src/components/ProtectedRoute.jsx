import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem('scs_auth') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/user/login" replace />;
    }

    return <Outlet />;
}
