import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for admin login flag
        const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        setIsAuthenticated(loggedIn);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
