import api from '../utils/axiosInstance';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

function getPermissionCodes(permissions) {
  return permissions.map(permission => permission.code);
}

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState({});

  const saveToken = token => {
    localStorage.setItem('token', JSON.stringify(token));
  };

  const loginUser = async () => {
    const res = await api.get('/profiles');
    localStorage.setItem('user', JSON.stringify(res.data));
    const permissions = getPermissionCodes(res.data.permissions);
    setUser({ ...res.data, permissions });
    setIsLoggedIn(true);
    router.push('/');
  };

  const persistUser = () => {
    const userObject = localStorage.getItem('user');
    if (userObject) {
      const user = JSON.parse(userObject);
      const permissions = getPermissionCodes(user.permissions);
      setUser({ ...user, permissions });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/auth');
  };

  useEffect(() => {
    persistUser();
    setIsInitializing(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        saveToken,
        loginUser,
        isLoggedIn,
        logoutUser,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
