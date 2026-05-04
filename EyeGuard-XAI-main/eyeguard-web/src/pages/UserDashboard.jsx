/**
 * ============================================================================
 * File: UserDashboard.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="px-4 md:px-lg py-lg max-w-[1200px] mx-auto organic-wave-bg w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-lg items-center mb-xl pt-lg">
        <div className="md:col-span-5 flex flex-col gap-md">
          <h1 className="font-h1 text-h1 text-on-surface leading-tight">Your Eye Health, <br/><span className="text-primary-container">Simplified.</span></h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Understanding your vision has never been easier. Take a quick screening or explore our educational resources to learn more about keeping your eyes healthy.
          </p>
          <div className="flex gap-md mt-sm">
            <Link to="/chatbot?topic=retinal_scans" className="bg-primary text-on-primary font-h3 text-h3 py-md px-xl rounded-full shadow-[0_8px_30px_rgba(93,31,26,0.15)] hover:scale-105 active:scale-95 transition-all flex items-center gap-sm">
              <span className="material-symbols-outlined">document_scanner</span> 
              Start Screening
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="rounded-[40px] overflow-hidden shadow-xl border border-outline-variant/30">
            <img 
              alt="Medical illustration" 
              className="w-full h-auto object-cover" 
              src="/sample_retina.png" 
            />
          </div>
        </div>
      </div>
      
      <section className="mb-xl">
        <div className="flex justify-between items-end mb-md">
          <h2 className="font-h2 text-h2 text-on-surface">Learn &amp; Explore</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Edu Card 1 */}
          <Link to="/chatbot?topic=education" className="bg-surface-container-lowest rounded-[32px] p-md border border-outline-variant/30 shadow-sm flex flex-col gap-sm hover:-translate-y-2 transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary-container opacity-20 transition-all group-hover:h-3 group-hover:opacity-100"></div>
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container mb-xs">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface">Common Symptoms</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-1 leading-relaxed">Learn about what to look out for, from blurry vision to dry eyes, and when to seek help.</p>
            <div className="text-primary-container font-h3 text-h3 flex items-center gap-xs mt-auto">
              Read More <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
          
          {/* Edu Card 2 */}
          <Link to="/chatbot?topic=analysis" className="bg-surface-container-lowest rounded-[32px] p-md border border-outline-variant/30 shadow-sm flex flex-col gap-sm hover:-translate-y-2 transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary-container opacity-20 transition-all group-hover:h-3 group-hover:opacity-100"></div>
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container mb-xs">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface">How AI Helps</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-1 leading-relaxed">Discover how our advanced algorithms work alongside doctors to detect issues early.</p>
            <div className="text-primary-container font-h3 text-h3 flex items-center gap-xs mt-auto">
              Read More <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
          
          {/* Chatbot Card */}
          <div className="bg-primary-container text-on-primary-container rounded-[32px] p-md shadow-lg shadow-primary-container/20 flex flex-col gap-sm relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 rounded-full bg-on-primary-container/20 flex items-center justify-center text-on-primary-container mb-xs z-10">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
            </div>
            <h3 className="font-h3 text-h3 z-10">Symptom Checker</h3>
            <p className="font-body-md text-body-md z-10 flex-1 leading-relaxed">Have a quick question about your eye health? Chat with our AI assistant for immediate guidance.</p>
            <Link to="/chatbot?topic=education" className="bg-white text-primary-container font-h3 text-h3 py-sm px-md rounded-full mt-auto z-10 hover:bg-stone-100 transition-colors text-center shadow-md flex justify-center items-center gap-2">
              Start Chat
              <span className="material-symbols-outlined">chat_bubble</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
