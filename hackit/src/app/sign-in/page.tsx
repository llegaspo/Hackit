'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setError(null);
    setSuccess(false);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', res.user);
      setSuccess(true);
      setEmail('');
      setPassword('');
      sessionStorage.setItem('user', 'true');
      router.push('/'); // Redirect to homepage
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        {/* Logo or Avatar */}
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#6366f1" />
            <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="Arial">LOGO</text>
          </svg>
        </div>
        <h1 className="text-gray-800 text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-gray-500 mb-6 text-center">Welcome back! Please enter your credentials.</p>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-indigo-400 transition"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-indigo-400 transition"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white font-semibold hover:bg-indigo-500 transition"
        >
          Sign In
        </button>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        {success && <div className="text-green-500 mt-4 text-center">Sign in successful!</div>}
        <div className="mt-6 text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-indigo-600 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;