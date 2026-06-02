/**
 * ============================================================================
 * File: UserScanResult.jsx
 * Location: pages
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserScanResult = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-margin md:p-lg max-w-4xl mx-auto w-full relative z-10 pt-10">
      {/* Background Organic Wave Graphic (Decorative) */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden -z-10 pointer-events-none opacity-20">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,192L48,202.7C96,213,192,235,288,240C384,245,480,235,576,202.7C672,171,768,117,864,122.7C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#5d1f1a" fillOpacity="1"></path>
        </svg>
      </div>
      
      {/* Header Section */}
      <header className="w-full mb-md flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary hover:text-primary-container transition-colors p-sm rounded-full hover:bg-surface-variant">
          <span className="material-symbols-outlined mr-xs">arrow_back</span>
          <span className="font-body-md font-medium">Back</span>
        </button>
        <h1 className="font-h2 text-h2 text-primary">Your Scan Results</h1>
        <div className="w-20"></div> {/* Spacer for balance */}
      </header>
      
      {/* Risk Indicator Card (Hero) */}
      <section className="w-full bg-surface-container rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] p-md md:p-lg mb-lg border border-outline-variant/30 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative organic top border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-fixed-dim via-primary to-primary-container"></div>
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-sm tracking-wider">Overall Status</p>
        
        {/* Risk Level Badge: Critical */}
        <div className="flex items-center justify-center bg-error-container text-on-error-container px-lg py-sm rounded-full mb-md shadow-sm border border-error/20">
          <span className="material-symbols-outlined mr-sm text-[32px]">warning</span>
          <span className="font-h2 text-h2 text-on-error-container uppercase tracking-tight">Glaucoma & DR Detected</span>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface max-w-2xl mt-sm">
          Our AI has identified high-confidence biomarkers for <span className="font-bold text-error">Glaucoma</span> and <span className="font-bold text-error">Diabetic Retinopathy</span>. Immediate clinical intervention is advised.
        </p>
        
        {/* Simple AI Explanation */}
        <div className="mt-lg w-full bg-surface p-md rounded-xl border border-primary/20 text-left">
          <h3 className="font-h3 text-h3 text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">psychology</span> How the AI Made Its Decision
          </h3>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            The AI looked closely at your eye scan. It highlighted a few tiny spots near the upper blood vessels that look a little different than usual. These spots are very small, but they tell the AI that there might be some early signs of stress in the eye (like tiny fluid leaks). Because the AI noticed this, we recommend having a human eye doctor take a quick look just to be safe. There is nothing to panic about, but catching these tiny changes early is great for your eye health!
          </p>
        </div>
      </section>
      
      {/* Explanation Grid */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
        {/* What We Found */}
        <div className="bg-surface rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] p-md border border-outline-variant/50 flex flex-col h-full">
          <div className="flex items-center mb-md pb-sm border-b border-surface-variant">
            <span className="material-symbols-outlined text-primary-container mr-sm text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
            <h3 className="font-h3 text-h3 text-primary">What We Found</h3>
          </div>
          <div className="flex-grow flex flex-col">
            <img alt="Scan Image" className="w-full h-48 object-cover rounded-lg mb-md shadow-sm" src="/images/retinal_scan.png" />
            <ul className="space-y-sm font-body-md text-body-md text-on-surface-variant flex-grow">
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary-fixed-dim mr-sm mt-xs">check_circle</span>
                <span>The main structure of your retina appears healthy and clear.</span>
              </li>
              <li className="flex items-start">
                <span className="material-symbols-outlined text-outline mr-sm mt-xs">error</span>
                <span>A slight variation was detected in the blood vessel pattern near the center. This is common but worth verifying.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-surface-bright rounded-xl shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] p-md border border-outline-variant/50 flex flex-col h-full relative overflow-hidden">
          {/* Decorative background wave */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[150px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
          </div>
          
          <div className="flex items-center mb-md pb-sm border-b border-surface-variant z-10">
            <span className="material-symbols-outlined text-tertiary-container mr-sm text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_run</span>
            <h3 className="font-h3 text-h3 text-tertiary">Recommended Next Steps</h3>
          </div>
          
          <div className="flex-grow flex flex-col justify-between z-10">
            <div className="space-y-md">
              <div className="bg-surface-container-low p-sm rounded-lg flex items-start">
                <div className="bg-primary text-on-primary rounded-full w-8 h-8 flex items-center justify-center mr-sm flex-shrink-0 font-h3">1</div>
                <p className="font-body-md text-body-md text-on-surface"><strong>Schedule a Routine Checkup:</strong> We recommend sharing these results with an Eye Doctor (Ophthalmologist) within the next few weeks.</p>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg flex items-start">
                <div className="bg-primary text-on-primary rounded-full w-8 h-8 flex items-center justify-center mr-sm flex-shrink-0 font-h3">2</div>
                <p className="font-body-md text-body-md text-on-surface"><strong>Monitor Your Vision:</strong> If you notice any sudden changes in your eyesight, please seek care immediately.</p>
              </div>
            </div>
            
            <button className="mt-lg w-full bg-primary text-on-primary font-h3 text-h3 py-md px-lg rounded-full shadow-md shadow-primary/20 hover:bg-primary-container transition-colors flex justify-center items-center">
              Consult an Ophthalmologist
              <span className="material-symbols-outlined ml-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Educational Footer Note */}
      <div className="w-full text-center max-w-xl mx-auto bg-surface-container-low p-md rounded-lg mt-md mb-xl">
        <span className="material-symbols-outlined text-outline-variant text-[32px] mb-xs">school</span>
        <p className="font-body-md text-body-md text-on-surface-variant italic">
          Remember, EyeGuard-XAI is an assistant designed to help you stay informed. It does not replace a professional medical diagnosis. Always trust your doctor's advice.
        </p>
      </div>
    </div>
  );
};

export default UserScanResult;
