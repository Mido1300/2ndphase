import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import UserDashboard from '../components/UserDashboard';

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <UserDashboard />;
}