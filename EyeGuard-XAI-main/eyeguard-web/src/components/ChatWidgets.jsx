/**
 * ============================================================================
 * File: ChatWidgets.jsx
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';

export const ScanHistoryWidget = () => (
  <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden w-full max-w-md my-2 shadow-sm">
    <div className="p-3 border-b border-outline-variant/30 bg-surface-variant/20 flex justify-between items-center">
      <span className="font-label-caps text-[10px] text-on-surface-variant">Recent Screening History</span>
      <span className="material-symbols-outlined text-sm">history</span>
    </div>
    <div className="p-2 space-y-2">
      {[
        { id: 'PAT-8842', date: 'Oct 24', status: 'High Risk', color: 'bg-error-container text-on-error-container' },
        { id: 'PAT-7120', date: 'Oct 22', status: 'Normal', color: 'bg-secondary-container/50 text-on-secondary-container' },
        { id: 'PAT-6591', date: 'Oct 15', status: 'Review Needed', color: 'bg-primary-container/30 text-on-primary-container' }
      ].map((scan, i) => (
        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="font-data-mono text-xs font-bold text-primary">{scan.id}</div>
            <div className="text-[10px] text-on-surface-variant">{scan.date}</div>
          </div>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${scan.color}`}>{scan.status}</span>
        </div>
      ))}
    </div>
    <button className="w-full py-2 text-xs font-bold text-primary-container border-t border-outline-variant/20 hover:bg-primary-container/5 transition-colors">
      View Full Records
    </button>
  </div>
);

export const AIAnalysisWidget = () => (
  <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-4 w-full max-w-md my-2 shadow-sm flex flex-col gap-3">
    <div className="flex items-center gap-2 text-primary-container">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
      <h4 className="font-h3 text-sm">AI Diagnostic Insight</h4>
    </div>
    <div className="space-y-2">
      <div>
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-on-surface-variant font-medium">Diabetic Retinopathy</span>
          <span className="text-error font-bold">87.4%</span>
        </div>
        <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-error rounded-full" style={{ width: '87.4%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-on-surface-variant font-medium">Glaucoma Probability</span>
          <span className="text-tertiary font-bold">12.1%</span>
        </div>
        <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-tertiary rounded-full" style={{ width: '12.1%' }}></div>
        </div>
      </div>
    </div>
    <Link to="/scan/demo" className="text-center py-2 bg-primary-container/10 text-primary-container rounded-lg text-xs font-bold hover:bg-primary-container/20 transition-all mt-1">
      Open Full Explainability Canvas
    </Link>
  </div>
);

export const EducationCardsWidget = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg my-2">
    {[
      { title: 'Common Symptoms', icon: 'visibility', desc: 'Blurry vision, dark spots, or faded colors.' },
      { title: 'Prevention Tips', icon: 'health_and_safety', desc: 'Regular exercise and blood sugar control.' },
      { title: 'How XAI Works', icon: 'psychology', desc: 'Understanding Grad-CAM and model heatmaps.' },
      { title: 'Find a Clinic', icon: 'location_on', desc: 'Locate nearby eye care professionals.' }
    ].map((card, i) => (
      <div key={i} className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all cursor-pointer group">
        <span className="material-symbols-outlined text-primary-container mb-2 group-hover:scale-110 transition-transform block" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
        <h5 className="font-h3 text-xs text-on-surface mb-1">{card.title}</h5>
        <p className="text-[10px] text-on-surface-variant leading-relaxed">{card.desc}</p>
      </div>
    ))}
  </div>
);
