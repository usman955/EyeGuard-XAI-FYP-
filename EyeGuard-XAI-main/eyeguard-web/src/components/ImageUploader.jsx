/**
 * ============================================================================
 * File: ImageUploader.jsx
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImageSelect, patientIdRequired = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // 1. Check if it's a video or other non-image type
    if (!file.type.startsWith('image/')) {
      setError('Image is not correct. Please select a valid image file (Videos are not allowed).');
      return;
    }

    // 2. Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than or equal to 5 MB.');
      return;
    }

    // 3. Simulated eye-check (Placeholder for future ML verification)
    // For now, we accept all images under 5MB, but we provide the error if 
    // the user wants to simulate a failed "eye detection" check.
    
    setError('');
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (patientIdRequired && !patientId.trim()) {
      setError('Patient ID is required.');
      return;
    }
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }
    
    onImageSelect({
      file: selectedFile,
      preview,
      patientId
    });
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };

  return (
    <div className="w-full">
      {patientIdRequired && (
        <div className="flex flex-col gap-xs mb-md">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Patient Identification
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">id_card</span>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="e.g. PAT-2026-001"
              className="w-full bg-surface-container border-b-2 border-surface-variant px-md py-sm pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-low transition-colors rounded-t-md"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="bg-error-container/30 border border-error/20 text-error p-sm rounded-lg text-sm flex items-center gap-sm mb-md animate-fade-in">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      {!preview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-xl text-center transition-all cursor-pointer group overflow-hidden ${
            dragActive 
              ? 'border-primary-container bg-primary-container/5' 
              : 'border-outline-variant hover:border-primary-container/50 hover:bg-surface-container-low'
          }`}
        >
          <div className="absolute inset-0 organic-wave opacity-5 pointer-events-none"></div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="relative z-10 flex flex-col items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface mb-xs">Drag & Drop Retinal Image</h3>
              <p className="font-body-md text-on-surface-variant">or click to browse from clinical device</p>
            </div>
            <div className="flex gap-sm text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-widest mt-sm">
              <span>JPG</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>DICOM compatible</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fetch('/images/retinal_scan.png')
                  .then(res => res.blob())
                  .then(blob => {
                    const file = new File([blob], "retinal_scan.png", { type: "image/png" });
                    processFile(file);
                  });
              }}
              className="mt-xs text-xs font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
            >
              Load sample retinal scan
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-lg animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 group">
            <img 
              src={preview} 
              alt="Scan Preview" 
              className="w-full h-auto max-h-[500px] object-contain bg-stone-900" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <button
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-error transition-colors w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              title="Remove image"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                <p className="text-white text-xs font-data-mono">FILE: {selectedFile.name}</p>
                <p className="text-white/60 text-[10px] font-data-mono uppercase">SIZE: {(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleUpload}
            className="w-full bg-primary-container text-on-primary font-h3 text-h3 py-md px-xl rounded-full shadow-lg shadow-primary-container/30 hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-sm"
          >
            <span className="material-symbols-outlined">analytics</span>
            Run AI Screening Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
