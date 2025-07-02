import React, { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login = () => {
  const { user, login, loading } = useAuth();
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // <-- Replace with your client ID
        callback: async (response) => {
          try {
            const res = await axios.post('http://localhost:5000/api/auth/google', {
              credential: response.credential,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
          } catch (err) {
            toast.error('Failed to log in');
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
      });
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post('http://localhost:5000/api/auth/google', { token: idToken });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to log in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-all duration-300">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2 flex items-center justify-center space-x-2">
            <span>TaskFlow</span>
            <Sparkles className="w-6 h-6 text-accent" />
          </h1>
          <p className="text-muted leading-relaxed">
            Streamline your productivity with elegant task management
          </p>
        </div>

        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-accent to-accent/90 text-white py-4 px-6 rounded-xl hover:from-accent/90 hover:to-accent transition-all duration-300 flex items-center justify-center space-x-3 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] group"
        >
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div ref={googleButtonRef} className="flex justify-center mt-4" />

        <div className="mt-6 text-center">
          <p className="text-muted text-sm">
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;