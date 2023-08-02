import api from '../utils/axiosInstance';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const saveToken = token => {
    localStorage.setItem('token', JSON.stringify(token));
  };

  const loginUser = async () => {
    const res = await api.get('/users/profile');
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    setIsLoggedIn(true);
  };

  const persistUser = () => {
    const userObject = localStorage.getItem('user');
    if (userObject) {
      setUser(JSON.parse(userObject));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  useEffect(() => {
    persistUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, saveToken, loginUser, isLoggedIn, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};