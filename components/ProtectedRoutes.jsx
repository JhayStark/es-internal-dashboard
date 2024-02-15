import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthProvider';

const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isInitializing, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (!isInitializing) {
      if (!isInitializing && !isLoggedIn && !router.pathname.includes('auth')) {
        router.replace('/auth');
      }
    }
  }, [isInitializing, isLoggedIn, router]);
  if (isInitializing) return <h2>Application loading</h2>;
  if (!isLoggedIn && !router.pathname.includes('auth')) return null;
  return <>{children}</>;
};

export default ProtectedRoutes;
