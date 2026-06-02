/**
 * ============================================================================
 * File: Register.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'doctor'
  const [license, setLicense] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const calculatePasswordStrength = (pass) => {
    if (!pass) return '';
    if (pass.length < 6) return 'Weak';
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    
    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    
    if (pass.length >= 10 && score === 4) return 'Very Strong';
    if (pass.length >= 8 && score >= 3) return 'Strong';
    if (pass.length >= 6 && score >= 2) return 'Good';
    return 'Weak';
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordStrength(calculatePasswordStrength(val));
  };
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (role === 'doctor' && !license.trim()) {
      setError('A valid Medical License Number is required for professional accounts.');
      return;
    }
    
    if (passwordStrength === 'Weak') {
      setError('Please choose a stronger password before continuing.');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role, license);
      alert('Registration successful! Please sign in with your new credentials.');
      navigate('/login', { 
        state: { 
          prefilledEmail: email.toLowerCase().trim(), 
          prefilledRole: role 
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden py-xl">
      {/* Decorative Ambient Background */}
      <div className="absolute inset-0 organic-wave pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-fixed-dim/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-[120px] z-0"></div>

      <main className="w-full max-w-[500px] mx-auto p-margin relative z-10">
        <div className="bg-surface-container-lowest p-lg rounded-[32px] shadow-[0_12px_40px_-12px_rgba(93,31,26,0.12)] border border-outline-variant/30 flex flex-col gap-md">
          <div className="text-center mb-sm">
            <h1 className="font-h1 text-h1 text-primary-container mb-xs">Join EyeGuard</h1>
            <p className="font-body-md text-on-surface-variant">Create your account for advanced screening</p>
          </div>

          {error && (
            <div className="bg-error-container/30 border border-error/20 text-error p-sm rounded-lg text-sm flex items-center gap-sm">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <form className="flex flex-col gap-sm" onSubmit={handleSubmit}>
            {/* Role Selection Bento */}
            <div className="grid grid-cols-2 gap-sm mb-md">
              <button 
                type="button"
                onClick={() => setRole('doctor')}
                className={`flex flex-col items-center justify-center p-md rounded-xl transition-all relative overflow-hidden group ${
                  role === 'doctor' 
                    ? 'border-2 border-primary-container bg-surface text-primary-container' 
                    : 'border border-outline-variant bg-surface text-on-surface-variant hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5'
                }`}
              >
                <span className="material-symbols-outlined text-3xl mb-sm" style={{ fontVariationSettings: role === 'doctor' ? "'FILL' 1" : "'FILL' 0" }}>stethoscope</span>
                <span className="font-h3 text-h3 text-[16px]">Professional</span>
                {role === 'doctor' && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary-container"></div>
                )}
              </button>
              
              <button 
                type="button"
                onClick={() => setRole('user')}
                className={`flex flex-col items-center justify-center p-md rounded-xl transition-all relative group ${
                  role === 'user' 
                    ? 'border-2 border-primary-container bg-surface text-primary-container' 
                    : 'border border-outline-variant bg-surface text-on-surface-variant hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5'
                }`}
              >
                <span className="material-symbols-outlined text-3xl mb-sm" style={{ fontVariationSettings: role === 'user' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                <span className="font-h3 text-h3 text-[16px]">General User</span>
                {role === 'user' && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary-container"></div>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">person</span>
                <input 
                  className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                  placeholder="John Doe" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">mail</span>
                <input 
                  className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                  placeholder="name@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {role === 'doctor' && (
              <div className="flex flex-col gap-xs mt-xs animate-fade-in">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Medical License Number <span className="text-error">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">badge</span>
                  <input 
                    className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                    placeholder="e.g. MD-12345678" 
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-xs mt-sm">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">lock</span>
                <input 
                  className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                />
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="flex items-center gap-xs mt-1">
                  <div className="flex-1 flex gap-1 h-1.5">
                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength === 'Weak' ? 'bg-error' : passwordStrength === 'Good' ? 'bg-amber-400' : (passwordStrength === 'Strong' || passwordStrength === 'Very Strong') ? 'bg-emerald-500' : 'bg-surface-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength === 'Good' ? 'bg-amber-400' : (passwordStrength === 'Strong' || passwordStrength === 'Very Strong') ? 'bg-emerald-500' : 'bg-surface-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${(passwordStrength === 'Strong' || passwordStrength === 'Very Strong') ? 'bg-emerald-500' : 'bg-surface-variant'}`}></div>
                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength === 'Very Strong' ? 'bg-emerald-600' : 'bg-surface-variant'}`}></div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${passwordStrength === 'Weak' ? 'text-error' : passwordStrength === 'Good' ? 'text-amber-500' : passwordStrength === 'Strong' ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    {passwordStrength}
                  </span>
                </div>
              )}
            </div>

            <button 
              className="bg-primary-container text-on-primary py-sm px-lg rounded-full font-h3 text-h3 text-[18px] shadow-[0_4px_12px_rgba(93,31,26,0.2)] hover:bg-primary disabled:opacity-50 transition-all mt-sm flex justify-center items-center gap-xs" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
              {!isLoading && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </form>

          <div className="text-center mt-sm">
            <p className="font-body-md text-on-surface-variant">
              Already have an account? <Link to="/login" className="text-primary-container font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
