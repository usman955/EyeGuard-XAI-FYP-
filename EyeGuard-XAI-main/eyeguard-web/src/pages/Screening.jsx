/**
 * ============================================================================
 * File: Screening.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';

const Screening = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (data) => {
    setIsAnalyzing(true);
    
    // Simulate AI Analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // Redirect to a mock scan result
      navigate('/scan/new-result');
    }, 2500);
  };

  return (
    <div className="p-lg w-full max-w-4xl mx-auto animate-fade-in min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <div className="text-center mb-xl">
        <div className="inline-block px-4 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-caps text-[10px] uppercase tracking-wider mb-sm">
          Clinical AI Diagnostic Tool
        </div>
        <h1 className="font-h1 text-h1 text-on-surface mb-xs">New Retinal Screening</h1>
        <p className="font-body-lg text-on-surface-variant">Upload a high-resolution fundus image to detect anomalies and generate an AI report.</p>
      </div>

      <div className="w-full bg-surface-container-lowest rounded-[40px] p-lg border border-outline-variant/30 shadow-xl relative overflow-hidden">
        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-4 border-primary-container border-t-transparent rounded-full animate-spin mb-md"></div>
            <h3 className="font-h3 text-h3 text-primary-container animate-pulse">Analyzing Retinal Microstructure...</h3>
            <p className="font-body-md text-on-surface-variant mt-2">Detecting vessel abnormalities and lesion regions</p>
          </div>
        )}
        
        <ImageUploader onImageSelect={handleImageSelect} patientIdRequired={true} />
        
        <div className="mt-lg grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="flex items-center gap-3 p-sm rounded-xl bg-surface-container-low border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary-container">verified_user</span>
            <div className="text-[10px] font-bold text-on-surface-variant uppercase">Validated Accuracy</div>
          </div>
          <div className="flex items-center gap-3 p-sm rounded-xl bg-surface-container-low border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary-container">psychology</span>
            <div className="text-[10px] font-bold text-on-surface-variant uppercase">XAI Interpretability</div>
          </div>
          <div className="flex items-center gap-3 p-sm rounded-xl bg-surface-container-low border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary-container">description</span>
            <div className="text-[10px] font-bold text-on-surface-variant uppercase">Automated Reporting</div>
          </div>
        </div>
      </div>

      <div className="mt-xl text-center text-on-surface-variant/60 text-xs font-medium max-w-lg">
        NOTICE: This AI tool is designed to assist medical professionals. All findings should be clinically verified by a licensed ophthalmologist.
      </div>
    </div>
  );
};

export default Screening;
