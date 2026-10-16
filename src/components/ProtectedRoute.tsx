import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/useContext";

const ProtectedRoute = () => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!user ) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
