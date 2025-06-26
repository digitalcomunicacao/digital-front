import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../config/Api';
import { CircularProgress, Box } from '@mui/material';

export const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        await api.get('/auth/check', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        localStorage.removeItem('token');
      }
    };

    verifyToken();
  }, []);

  if (isAuth === null)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );

  if (!isAuth) return <Navigate to="/login" />;

  return children;
};
