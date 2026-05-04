/**
 * ============================================================================
 * File: DoctorRetinalScans.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';

const DoctorRetinalScans = () => {
  const scans = [
    { id: 'SCN-001', patientId: 'PAT-2024-001', patientName: 'James Wilson', type: 'Color Fundus', date: '2024-05-01', aiFlag: 'DR Detected', risk: 'High' },
    { id: 'SCN-002', patientId: 'PAT-2024-002', patientName: 'Maria Garcia', type: 'Color Fundus', date: '2024-04-28', aiFlag: 'Clear', risk: 'Normal' },
    { id: 'SCN-003', patientId: 'PAT-2024-003', patientName: 'Robert Chen', type: 'Red-free Fundus', date: '2024-04-25', aiFlag: 'Glaucoma suspected', risk: 'Moderate' },
    { id: 'SCN-004', patientId: 'PAT-2024-004', patientName: 'Sarah Miller', type: 'Color Fundus', date: '2024-04-20', aiFlag: 'AMD Detected', risk: 'Critical' },
  ];

  return (
    <div className="p-lg w-full animate-fade-in">
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Retinal Scan Reports</h1>
          <p className="font-body-lg text-on-surface-variant">Centralized repository for all analyzed retinal imaging data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {scans.map((scan, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col hover:border-primary/50 transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/images/retinal_scan.png" 
                alt="Scan Thumbnail" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                  scan.risk === 'Critical' ? 'text-red-400' : scan.risk === 'High' ? 'text-orange-400' : 'text-emerald-400'
                }`}>
                  {scan.risk} RISK
                </span>
              </div>
            </div>
            <div className="p-lg flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-h3 text-on-surface text-lg mb-1">{scan.patientName}</h3>
                  <div className="font-data-mono text-xs text-on-surface-variant font-bold uppercase">ID: {scan.patientId}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Type</div>
                  <div className="font-body-md text-sm font-semibold">{scan.type}</div>
                </div>
              </div>
              
              <div className="bg-surface-container-low rounded-xl p-3 mb-6 border border-outline-variant/10">
                <div className="flex items-center gap-3 text-on-surface-variant mb-2">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span className="text-[11px] font-medium">Scanned on {scan.date}</span>
                </div>
                <div className="flex items-center gap-3 text-primary-container">
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  <span className="text-[11px] font-bold">{scan.aiFlag}</span>
                </div>
              </div>
              
              <Link to={`/scan/${scan.id}`} className="mt-auto w-full bg-primary-container text-on-primary-container font-h3 py-2 rounded-full text-center hover:bg-primary hover:text-white transition-all shadow-sm">
                Open Detailed Report
              </Link>
            </div>
          </div>
        ))}
        
        {/* Placeholder for "Add Scan" context? No, user said remove "Upload New Scan" button. 
            So I'll just keep the existing ones. */}
      </div>
    </div>
  );
};

export default DoctorRetinalScans;
