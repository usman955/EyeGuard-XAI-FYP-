/**
 * ============================================================================
 * File: DoctorHistory.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';

const DoctorHistory = () => {
  const historyData = [
    { id: 'PAT-2024-001', name: 'James Wilson', date: '2024-05-01', diagnosis: 'Diabetic Retinopathy', severity: 'Moderate', status: 'Completed' },
    { id: 'PAT-2024-002', name: 'Maria Garcia', date: '2024-04-28', diagnosis: 'Normal', severity: 'None', status: 'Completed' },
    { id: 'PAT-2024-003', name: 'Robert Chen', date: '2024-04-25', diagnosis: 'Glaucoma suspected', severity: 'Mild', status: 'Follow-up' },
    { id: 'PAT-2024-004', name: 'Sarah Miller', date: '2024-04-20', diagnosis: 'AMD', severity: 'Severe', status: 'Emergency' },
    { id: 'PAT-2024-005', name: 'Michael Brown', date: '2024-04-18', diagnosis: 'Normal', severity: 'None', status: 'Completed' },
  ];

  return (
    <div className="p-lg w-full animate-fade-in">
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Clinical History</h1>
          <p className="font-body-lg text-on-surface-variant">Archived patient screening records and diagnostic reports.</p>
        </div>
        <div className="flex gap-md">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search by Patient ID or Name" 
              className="bg-surface-container-low border border-outline-variant/30 rounded-full py-2 pl-10 pr-6 text-sm focus:outline-none focus:border-primary-container w-64 transition-all"
            />
          </div>
          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full flex items-center gap-2 hover:bg-outline-variant/20 transition-all font-body-md text-sm font-bold">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-outline-variant/30 font-label-caps text-label-caps text-on-surface-variant text-[11px] tracking-widest">
              <th className="px-6 py-4">Patient Details</th>
              <th className="px-6 py-4">Screening Date</th>
              <th className="px-6 py-4">Primary Diagnosis</th>
              <th className="px-6 py-4">Severity Level</th>
              <th className="px-6 py-4">Current Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {historyData.map((record, index) => (
              <tr key={index} className="hover:bg-surface-container-high/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-data-mono text-xs font-bold text-primary">{record.id}</div>
                  <div className="font-body-md text-on-surface font-semibold">{record.name}</div>
                </td>
                <td className="px-6 py-4 font-body-md text-on-surface-variant text-sm">
                  {record.date}
                </td>
                <td className="px-6 py-4">
                  <span className="font-body-md text-on-surface text-sm">{record.diagnosis}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                    record.severity === 'Severe' ? 'bg-error-container text-on-error-container' : 
                    record.severity === 'Moderate' ? 'bg-tertiary-container text-on-tertiary-container' :
                    'bg-secondary-container/30 text-on-secondary-container'
                  }`}>
                    {record.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${record.status === 'Emergency' ? 'bg-error animate-pulse' : 'bg-primary'}`}></div>
                    <span className="text-xs font-body-md text-on-surface-variant font-medium">{record.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/scan/${record.id}`} className="text-primary-container hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-lg flex justify-center">
        <nav className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all disabled:opacity-30" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-bold shadow-sm">1</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">2</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DoctorHistory;
