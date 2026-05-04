/**
 * ============================================================================
 * File: Navbar.jsx
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#fdfbf7] dark:bg-stone-950 flex justify-between items-center px-6 h-16 w-full sticky top-0 z-50 border-b-2 border-[#5D1F1A]/10 dark:border-stone-800 shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] font-['Space_Grotesk'] tracking-tight">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-[#5D1F1A] dark:text-red-400">EyeGuard-XAI</Link>
        {user && (
          <Link 
            to="/screening" 
            className="hidden md:flex items-center gap-2 bg-[#5D1F1A] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all ml-4"
          >
            <span className="material-symbols-outlined text-sm">add_a_photo</span>
            New Screening
          </Link>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-[#5D1F1A] leading-none">{user.name}</span>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold mt-1">{user.role}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-[#5D1F1A] dark:text-red-200 hover:bg-[#5D1F1A]/5 rounded-full p-2 transition-all flex items-center gap-2 group" 
              title="Logout"
            >
              <span className="hidden md:block text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-[#5D1F1A] font-bold hover:bg-[#5D1F1A]/5 rounded-lg px-4 py-2 transition-all">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
