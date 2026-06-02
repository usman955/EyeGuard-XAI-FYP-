/**
 * ============================================================================
 * File: Sidebar.jsx
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isDoctor = user?.role === 'doctor';

  const DoctorSidebar = () => (
    <div className="flex flex-col gap-1 px-2 flex-grow">
      <NavLink 
        to="/dashboard/doctor" 
        className={({ isActive }) => 
          isActive 
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">grid_view</span>
        Home
      </NavLink>
      <NavLink 
        to="/screening" 
        className={({ isActive }) => 
          isActive || location.pathname === '/screening'
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">add_a_photo</span>
        New Screening
      </NavLink>
      <NavLink 
        to="/doctor/scans" 
        className={({ isActive }) => 
          isActive 
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">visibility</span>
        Report Gallery
      </NavLink>
      <NavLink 
        to="/doctor/history" 
        className={({ isActive }) => 
          isActive 
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">history</span>
        Clinical History
      </NavLink>
      <NavLink 
        to="/chatbot" 
        className={({ isActive }) => 
          isActive 
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">psychiatry</span>
        XAI Assistant
      </NavLink>
      <NavLink 
        to="#" 
        className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 mt-auto transition-all"
      >
        <span className="material-symbols-outlined">settings</span>
        Settings
      </NavLink>
    </div>
  );

  const UserSidebar = () => (
    <div className="flex flex-col gap-1 px-2 flex-grow">
      <NavLink 
        to="/dashboard/user" 
        className={({ isActive }) => 
          isActive 
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">grid_view</span>
        Home
      </NavLink>
      <NavLink 
        to="/screening" 
        className={({ isActive }) => 
          isActive || location.pathname === '/screening'
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">add_a_photo</span>
        Start Screening
      </NavLink>
      <NavLink 
        to="/chatbot?topic=education" 
        className={({ isActive }) => 
          location.search.includes('education')
            ? "bg-[#5D1F1A] text-white rounded-lg mx-2 my-1 shadow-sm flex items-center gap-3 px-4 py-3 transition-all"
            : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 transition-all"
        }
      >
        <span className="material-symbols-outlined">forum</span>
        Health Assistant
      </NavLink>
      <NavLink 
        to="#" 
        className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 mx-2 my-1 rounded-lg flex items-center gap-3 px-4 py-3 mt-auto transition-all"
      >
        <span className="material-symbols-outlined">settings</span>
        Settings
      </NavLink>
    </div>
  );

  return (
    <nav className="hidden md:flex flex-col py-4 fixed left-0 top-16 h-[calc(100vh-64px)] bg-stone-50 dark:bg-stone-900 w-64 border-r border-stone-200 dark:border-stone-800 z-40 font-['Space_Grotesk'] text-sm font-medium">
      <div className="px-6 mb-8 flex items-center gap-4 mt-4">
        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden shadow-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-h2">person</span>
        </div>
        <div>
          <div className="font-bold text-[#5D1F1A] dark:text-red-300 text-lg leading-tight">{user?.name || 'Authorized User'}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mt-1">{isDoctor ? 'Medical Lead' : 'General User'}</div>
        </div>
      </div>
      
      {isDoctor ? <DoctorSidebar /> : <UserSidebar />}
    </nav>
  );
};

export default Sidebar;
