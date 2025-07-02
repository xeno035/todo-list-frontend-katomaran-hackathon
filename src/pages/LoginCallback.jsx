import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse token from URL (e.g., /login/callback?token=...)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Optionally, set up context or any other state here
      navigate('/dashboard', { replace: true });
    } else {
      // Handle error: no token found
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default LoginCallback; 