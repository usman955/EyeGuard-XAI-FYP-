/**
 * ============================================================================
 * File: Login.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // New state for mode selection
  const [selectedMode, setSelectedMode] = useState('doctor'); // 'doctor' or 'user'

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'doctor') {
        navigate('/dashboard/doctor');
      } else {
        navigate('/dashboard/user');
      }
    } catch (err) {
      alert(err.message || 'Invalid email or password. \n\nTry:\ndoctor@eyeguard.com / password\nuser@eyeguard.com / password');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative Ambient Background */}
      <div className="absolute inset-0 organic-wave pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-fixed-dim/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-[120px] z-0"></div>
      
      <main className="w-full max-w-[1200px] mx-auto p-margin relative z-10 grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        {/* Left: Branding & Intro */}
        <div className="flex flex-col gap-lg z-10">
          <div>
            <h1 className="font-h1 text-h1 text-primary-container mb-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-4xl" data-icon="visibility" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              EyeGuard-XAI
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[400px]">
              Advanced Retinal Analysis powered by Explainable AI. Bridging the gap between clinical precision and human understanding.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)]">
            <img 
              alt="EyeGuard AI concept" 
              className="w-full h-auto object-cover aspect-[1.54]" 
              src="/sample_retina.png" 
            />
          </div>
        </div>

        {/* Right: Login / Mode Selection Panel */}
        <div className="bg-surface-container-lowest p-lg rounded-[32px] shadow-[0_12px_40px_-12px_rgba(93,31,26,0.12)] border border-outline-variant/30 flex flex-col gap-md z-10">
          <div className="text-center mb-sm">
            <h2 className="font-h2 text-h2 text-on-surface mb-xs">Welcome</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Select your access mode to continue</p>
          </div>

          {/* Mode Selection Bento */}
          <div className="grid grid-cols-2 gap-sm mb-md">
            {/* Doctor Mode */}
            <button 
              onClick={() => setSelectedMode('doctor')}
              className={`flex flex-col items-center justify-center p-md rounded-xl transition-all relative overflow-hidden group ${
                selectedMode === 'doctor' 
                  ? 'border-2 border-primary-container bg-surface text-primary-container' 
                  : 'border border-outline-variant bg-surface text-on-surface-variant hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5'
              }`}
            >
              <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined text-3xl mb-sm" data-icon="stethoscope" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>stethoscope</span>
              <span className="font-h3 text-h3 text-[18px]">Medical Professional</span>
              <span className="font-label-caps text-label-caps mt-xs">High Density Data</span>
              {selectedMode === 'doctor' && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary-container"></div>
              )}
            </button>
            
            {/* General User Mode */}
            <button 
              onClick={() => setSelectedMode('user')}
              className={`flex flex-col items-center justify-center p-md rounded-xl transition-all relative group ${
                selectedMode === 'user' 
                  ? 'border-2 border-primary-container bg-surface text-primary-container' 
                  : 'border border-outline-variant bg-surface text-on-surface-variant hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5'
              }`}
            >
              <span className="material-symbols-outlined text-3xl mb-sm" data-icon="person" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <span className="font-h3 text-h3 text-[18px]">General User</span>
              <span className="font-label-caps text-label-caps mt-xs">Simple Educational</span>
              {selectedMode === 'user' && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary-container"></div>
              )}
            </button>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-sm" onSubmit={handleLogin}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant" data-icon="mail">mail</span>
                <input 
                  className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                  id="email" 
                  placeholder={selectedMode === 'doctor' ? "doctor@eyeguard.com" : "user@eyeguard.com"} 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-xs mt-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant" data-icon="lock">lock</span>
                <input 
                  className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-xs mb-sm">
              <label className="flex items-center gap-xs cursor-pointer">
                <input className="form-checkbox rounded text-primary-container border-outline focus:ring-primary-container" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface-variant text-[14px]">Remember me</span>
              </label>
              <a className="font-body-md text-body-md text-primary-container text-[14px] hover:underline" href="#">Forgot password?</a>
            </div>

            <button 
              className="bg-primary-container text-on-primary py-sm px-lg rounded-full font-h3 text-h3 text-[18px] shadow-[0_4px_12px_rgba(93,31,26,0.2)] hover:bg-primary transition-colors mt-sm flex justify-center items-center gap-xs" 
              type="submit"
            >
              Sign In
              <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-on-surface-variant text-sm">
              Don't have an account? <Link to="/register" className="text-primary-container font-bold hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
