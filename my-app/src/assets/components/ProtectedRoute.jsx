import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')
    const pageBack = useLocation()
    if (token) {
        return children
    }
    return <Navigate to='/login' state={{ form: pageBack.pathname }} replace />
}

export default ProtectedRoute