import { useAppSelector } from '../../store/hooks';
import { Outlet, Navigate } from 'react-router';

export default function ProtectedRoutes() {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
