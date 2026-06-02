/**
 * ============================================================================
 * File: DoctorScanResult.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorScanResult = () => {
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
  const [observations, setObservations] = useState('');
  const [viewMode, setViewMode] = useState('overlay'); // 'overlay' or 'split'

  return (
    <div className="bg-organic-wave max-w-[1440px] mx-auto p-margin md:p-lg">
      {/* Header / Patient Context */}
      <div className="mb-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-background mb-2">Advanced XAI Analysis</h1>
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
            <span className="font-data-mono text-data-mono font-bold text-primary">ID: PAT-8842-A</span>
            <span className="opacity-50">•</span>
            <span>Scan Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="opacity-50">•</span>
            <span>Right Eye (OD)</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-outline text-on-surface px-4 py-2 rounded-full font-body-md hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-sm">download</span> Export Report
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-sm">
        {/* Imaging Panel (Span 8) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] border border-outline-variant/20 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface">
            <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">visibility</span> Retinal Imaging
            </h2>
            <div className="flex gap-2 bg-surface-variant p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 font-label-caps text-label-caps rounded-md transition-all ${viewMode === 'split' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:bg-surface/50'}`}
              >
                Split View
              </button>
              <button 
                onClick={() => setViewMode('overlay')}
                className={`px-3 py-1 font-label-caps text-label-caps rounded-md transition-all ${viewMode === 'overlay' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:bg-surface/50'}`}
              >
                Overlay
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-surface-container-low flex flex-col gap-4">
            {/* Main Interactive Viewer */}
            {viewMode === 'overlay' ? (
              <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 aspect-[2] bg-surface-variant flex items-center justify-center">
                {/* Base Original Scan */}
                <img alt="Retinal fundus scan image" className="absolute inset-0 w-full h-full object-cover" src="/images/retinal_scan.png" />
                
                {/* Grad-CAM Overlay */}
                <img 
                  alt="Grad-CAM heatmap visualization" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200" 
                  src="/images/gradcam_scan.png" 
                  style={{ opacity: heatmapOpacity }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 h-full aspect-[2]">
                <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-variant">
                  <img alt="Original scan" className="w-full h-full object-cover" src="/images/retinal_scan.png" />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md uppercase font-bold">Original</div>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-variant">
                  <img alt="Heatmap scan" className="w-full h-full object-cover" src="/images/gradcam_scan.png" />
                  <div className="absolute top-2 left-2 bg-primary/80 text-white text-[10px] px-2 py-1 rounded-md uppercase font-bold">XAI Heatmap</div>
                </div>
              </div>
            )}
            
            {/* Opacity Control */}
            <div className="bg-surface rounded-lg p-4 border border-outline-variant/30 flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant">opacity</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Original</span>
                  <span className="font-label-caps text-label-caps text-primary uppercase font-bold">XAI Heatmap Overlay</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analysis & Scoring Panel (Span 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-sm">
          {/* Probability Scores */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] border border-outline-variant/20 p-6 flex-1">
            <h2 className="font-h3 text-h3 text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span> Disease Probability
            </h2>
            <div className="space-y-6">
              {/* DR */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">Diabetic Retinopathy</span>
                  <span className="font-data-mono text-data-mono text-error font-bold text-lg">87.4%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full" style={{ width: '87.4%' }}></div>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant mt-1">Primary indicators detected in superior temporal quadrant.</p>
              </div>
              
              {/* Glaucoma */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">Glaucoma Suspect</span>
                  <span className="font-data-mono text-data-mono text-tertiary font-bold text-lg">34.2%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '34.2%' }}></div>
                </div>
              </div>
              
              {/* AMD */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">Macular Degeneration</span>
                  <span className="font-data-mono text-data-mono text-secondary font-bold text-lg">12.8%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '12.8%' }}></div>
                </div>
              </div>
            </div>
            
            {/* XAI Clinical Interpretation Panel */}
            <div className="mt-6 pt-6 border-t border-outline-variant/30">
              <h3 className="font-h3 text-h3 text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span> XAI Clinical Interpretation
              </h3>
              <div className="bg-surface-variant/30 p-4 rounded-lg border border-outline-variant/50">
                <p className="font-body-md text-sm text-on-surface leading-relaxed">
                  <strong className="text-primary">Inference Path:</strong> The Grad-CAM activation heatmap indicates a high concentration of salient features in the superior temporal quadrant <span className="font-data-mono bg-surface-variant px-1 rounded text-xs">weight: 0.85</span>. 
                  <br/><br/>
                  The primary regions of interest correlate strongly with the morphological presence of microaneurysms and hard exudates. The convolutional neural network's final dense layer activations strongly favor Diabetic Retinopathy, localized primarily along the vascular arcades. No significant glaucomatous cupping or macular drusen were heavily weighted in the forward pass.
                </p>
              </div>
            </div>
            
            {/* XAI Assistant Link */}
            <div className="mt-6 pt-6 border-t border-outline-variant/30">
              <p className="font-body-md text-sm text-on-surface-variant mb-3">Need deeper clinical insights on these probabilities?</p>
              <Link 
                to="/chatbot?topic=clinical_review" 
                className="w-full py-3 bg-[#5D1F1A] hover:bg-[#410a07] text-white rounded-xl font-body-md shadow-md flex justify-center items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">psychiatry</span>
                Discuss with XAI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Clinical Notes Panel (Span 12) */}
        <div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] border border-outline-variant/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_note</span> Clinical Observations
            </h2>
            <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full">Auto-Saved</span>
          </div>
          <div className="relative">
            <textarea 
              className="w-full h-32 bg-surface-container-low border-b-2 border-outline focus:border-primary border-t-0 border-x-0 rounded-t-lg p-4 font-body-md text-body-md text-on-surface focus:ring-0 resize-none transition-colors" 
              placeholder="Enter specific findings, refer to XAI heatmaps..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button 
              onClick={() => setObservations('')}
              className="px-6 py-2 border border-primary text-primary rounded-full font-body-md hover:bg-primary/5 transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={() => {
                if (!observations.trim()) return alert('Please enter clinical findings before finalizing.');
                alert('Report signed and finalized successfully!');
              }}
              className="px-6 py-2 bg-primary text-on-primary rounded-full font-body-md shadow-md hover:shadow-lg transition-all"
            >
              Sign & Finalize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScanResult;
