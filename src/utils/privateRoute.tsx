import { useAuth } from '@/context/authContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function privateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' />
}
