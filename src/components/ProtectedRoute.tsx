import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/useContext';

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  
  return <Outlet />;
};

export default ProtectedRoute;
