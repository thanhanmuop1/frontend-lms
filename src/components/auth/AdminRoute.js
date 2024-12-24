import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';
    
    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute; 