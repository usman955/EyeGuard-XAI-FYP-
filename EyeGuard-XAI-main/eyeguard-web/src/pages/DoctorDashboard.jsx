/**
 * ============================================================================
 * File: DoctorDashboard.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pb-24 md:pb-lg p-margin md:p-lg w-full animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-h2 text-h2 text-on-background mb-2">Welcome back, {user?.name || 'Dr. Smith'}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Here is your daily overview of patient screenings.</p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-sm md:gap-gutter mb-lg">
        
        {/* Quick Stats Area */}
        <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-sm md:gap-gutter">
          <Link to="/doctor/history" className="bg-surface-container-lowest rounded-[24px] p-md shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-surface-variant">PENDING REVIEWS</span>
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">pending_actions</span>
            </div>
            <div>
              <div className="font-h1 text-h1 text-primary">12</div>
              <div className="font-body-md text-body-md text-on-surface-variant mt-1">Requires attention today</div>
            </div>
          </Link>
          <Link to="/doctor/scans" className="bg-surface-container-lowest rounded-[24px] p-md shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-caps text-label-caps text-on-surface-variant">SCANS ANALYZED</span>
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">analytics</span>
            </div>
            <div>
              <div className="font-h1 text-h1 text-primary">48</div>
              <div className="font-body-md text-body-md text-on-surface-variant mt-1"><span className="text-primary-container font-semibold">+4</span> since yesterday</div>
            </div>
          </Link>
          
          {/* Scan Preview Canvas */}
          <div className="col-span-1 md:col-span-2 rounded-[32px] overflow-hidden shadow-md border border-outline-variant/30 relative h-[300px] group">
            <img alt="Retinal fundus scan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/sample_retina.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-lg">
              <h3 className="font-h3 text-h3 text-white mb-1">Latest Screening Activity</h3>
              <p className="font-body-md text-white/70 mb-4">AI flagged potential abnormalities in patient ID-7842. Review recommended.</p>
              <Link to="/doctor/scans" className="bg-primary-container text-on-primary-container font-h3 text-h3 py-sm px-lg rounded-full w-fit hover:scale-105 active:scale-95 transition-all inline-block text-center shadow-lg">View Scan Report</Link>
            </div>
          </div>
        </div>

        {/* Recent Screenings List */}
        <div className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-[32px] shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
          <div className="p-md border-b border-outline-variant/30 bg-surface-container-low/50 flex justify-between items-center">
            <h3 className="font-h3 text-h3 text-on-surface">Recent Patient Activity</h3>
            <span className="material-symbols-outlined text-on-surface-variant">list</span>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {/* List Item */}
            <Link to="/doctor/scans" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/50 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container/30 text-error flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                </div>
                <div>
                  <div className="font-data-mono text-xs text-on-surface font-bold group-hover:text-primary transition-colors">ID-9021</div>
                  <div className="text-[11px] text-on-surface-variant">Reported 10m ago</div>
                </div>
              </div>
              <span className="bg-error-container text-on-error-container font-label-caps text-[9px] px-2 py-0.5 rounded-full font-bold">HIGH RISK</span>
            </Link>
            {/* List Item */}
            <Link to="/doctor/scans" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/50 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div>
                  <div className="font-data-mono text-xs text-on-surface font-bold group-hover:text-primary transition-colors">ID-7842</div>
                  <div className="text-[11px] text-on-surface-variant">Reported 1h ago</div>
                </div>
              </div>
              <span className="bg-surface-variant text-on-surface-variant font-label-caps text-[9px] px-2 py-0.5 rounded-full font-bold">PENDING</span>
            </Link>
            {/* List Item */}
            <Link to="/doctor/scans" className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/50 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <div className="font-data-mono text-xs text-on-surface font-bold group-hover:text-primary transition-colors">ID-5534</div>
                  <div className="text-[11px] text-on-surface-variant">Reported 3h ago</div>
                </div>
              </div>
              <span className="text-secondary font-label-caps text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest">Normal</span>
            </Link>
          </div>
          <div className="p-4 border-t border-outline-variant/30 text-center">
            <Link to="/doctor/history" className="font-h3 text-h3 text-primary-container hover:underline transition-all">Explore Full Clinical Records</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
