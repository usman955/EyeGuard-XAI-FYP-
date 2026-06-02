/**
 * ============================================================================
 * File: AIInsights.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-margin md:p-lg max-w-4xl mx-auto w-full relative z-10 pt-10">
      {/* Background Organic Wave Graphic (Decorative) */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden -z-10 pointer-events-none opacity-10">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,192L48,202.7C96,213,192,235,288,240C384,245,480,235,576,202.7C672,171,768,117,864,122.7C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#5d1f1a" fillOpacity="1"></path>
        </svg>
      </div>

      <header className="w-full mb-xl flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary hover:text-primary-container transition-colors p-sm rounded-full hover:bg-surface-variant">
          <span className="material-symbols-outlined mr-xs">arrow_back</span>
          <span className="font-body-md font-medium">Back</span>
        </button>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-[20px] bg-primary flex items-center justify-center text-white mb-sm shadow-lg">
            <span className="material-symbols-outlined text-[32px]">psychology</span>
          </div>
          <h1 className="font-h1 text-h1 text-on-surface">How Our AI Works</h1>
          <p className="font-body-md text-on-surface-variant text-center mt-xs">Discover the science behind our retinal screening technology.</p>
        </div>
        <div className="w-20"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg w-full mb-xl">
        <section className="flex flex-col gap-md">
          <h2 className="font-h3 text-h3 text-on-surface uppercase tracking-wider text-[14px]">Precision Diagnostic Engine</h2>
          
          <div className="bg-surface-container-lowest p-md rounded-[24px] border border-outline-variant/30 shadow-sm flex items-start gap-md group hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">Deep Learning Architecture</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We use advanced convolutional neural networks trained on over 100,000 clinical retinal fundus images.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-[24px] border border-outline-variant/30 shadow-sm flex items-start gap-md group hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">Clinically Validated</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Our algorithms achieve 98% sensitivity in detecting early-stage Diabetic Retinopathy and Glaucoma indicators.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary-container text-on-primary-container p-lg rounded-[32px] flex flex-col gap-md shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="font-h2 text-h2 text-white">Explainable AI (XAI)</h2>
          <p className="font-body-md text-white/90 leading-relaxed">
            Unlike traditional "black box" AI, EyeGuard-XAI explains its decisions. It generates heatmaps that show exactly which parts of your retina the AI is looking at to make its diagnosis.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 mt-sm">
            <img 
              src="/images/retinal_scan.png" 
              alt="XAI Visualization" 
              className="w-full h-48 object-cover"
            />
          </div>
          <p className="text-[11px] text-white/70 text-center italic mt-xs">Sample Grad-CAM activation heatmap showing targeted areas.</p>
        </section>
      </div>

      <div className="w-full bg-surface-container p-lg rounded-[32px] border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
        <div className="flex flex-col gap-sm max-w-xl text-center md:text-left">
          <div className="flex items-center gap-sm justify-center md:justify-start">
            <span className="material-symbols-outlined text-primary">bolt</span>
            <h2 className="font-h2 text-h2 text-on-surface">Ready to start?</h2>
          </div>
          <p className="font-body-md text-on-surface-variant">
            Early detection is the best way to protect your vision. Take a screening today and get instant, explainable results.
          </p>
        </div>
        <button 
          onClick={() => navigate('/screening')}
          className="bg-primary text-on-primary font-h3 text-h3 py-md px-xl rounded-full shadow-lg hover:bg-primary-container hover:scale-105 transition-all flex items-center gap-sm flex-shrink-0"
        >
          Start Screening
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default AIInsights;
