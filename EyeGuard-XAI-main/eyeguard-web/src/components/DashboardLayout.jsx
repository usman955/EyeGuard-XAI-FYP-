/**
 * ============================================================================
 * File: DashboardLayout.jsx
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  
  const getIconClass = (topic) => {
    return location.search.includes(topic) 
      ? "text-[#5D1F1A] dark:text-red-400 font-bold scale-110" 
      : "text-stone-400 dark:text-stone-600";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 pb-safe bg-white/90 backdrop-blur-md dark:bg-stone-950/90 rounded-t-[32px] border-t border-stone-100 dark:border-stone-800 shadow-[0_-8px_30px_rgba(93,31,26,0.1)] transition-all font-['Space_Grotesk'] text-[10px] uppercase font-bold">
      <Link to="/dashboard/doctor" className={`flex flex-col items-center justify-center transition-transform hover:scale-110 ${location.pathname.includes('dashboard') ? 'text-[#5D1F1A]' : 'text-stone-400'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('dashboard') ? "'FILL' 1" : "" }}>home</span>
        <span className="mt-1">Home</span>
      </Link>
      <Link to="/chatbot?topic=retinal_scans" className={`flex flex-col items-center justify-center transition-transform hover:scale-110 ${getIconClass('retinal_scans')}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.search.includes('retinal_scans') ? "'FILL' 1" : "" }}>document_scanner</span>
        <span className="mt-1">Scans</span>
      </Link>
      <Link to="/chatbot?topic=analysis" className={`flex flex-col items-center justify-center transition-transform hover:scale-110 ${getIconClass('analysis')}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.search.includes('analysis') ? "'FILL' 1" : "" }}>auto_awesome</span>
        <span className="mt-1">Insights</span>
      </Link>
      <Link to="/chatbot?topic=education" className={`flex flex-col items-center justify-center transition-transform hover:scale-110 ${getIconClass('education')}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: location.search.includes('education') ? "'FILL' 1" : "" }}>forum</span>
        <span className="mt-1">Help</span>
      </Link>
    </nav>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64 w-full min-h-[calc(100vh-64px)] relative z-10 pb-24 md:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
      {/* Floating Action Button for Mobile - Quick Scan */}
      <Link 
        to="/chatbot?topic=retinal_scans" 
        className="md:hidden fixed bottom-24 right-4 bg-[#5D1F1A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#5D1F1A]/40 z-50 hover:scale-110 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
      </Link>
    </div>
  );
};

export default DashboardLayout;
