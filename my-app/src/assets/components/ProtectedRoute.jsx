import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem('token')
    const pageBack = useLocation()
    if (!token) {
        return <Navigate to='/login' state={{ form: pageBack.pathname || '/' }} replace />
    }
    return <Outlet />
}

export default ProtectedRoute