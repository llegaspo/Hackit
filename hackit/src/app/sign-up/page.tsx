'use client'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    setSuccess(false);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', res.user);
      setSuccess(true);
      setEmail('');
      setPassword('');
      sessionStorage.setItem('user', 'true');
    } catch (e: any) {
      setError(e.message || 'Failed to sign up');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        {error && <div className="text-red-400 mt-4">{error}</div>}
        {success && <div className="text-green-400 mt-4">Sign up successful!</div>}
      </div>
    </div>
  );
};

//this component is a simple sign-up form that allows users to create an account using their email and password
//uses Firebase auth to handle user creation
export default SignUp;