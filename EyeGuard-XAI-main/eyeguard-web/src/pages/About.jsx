import React from 'react';

const About = () => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full px-4 md:px-lg py-lg max-w-[900px] mx-auto organic-wave-bg">
        <div className="text-center mb-xl pt-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-caps text-[10px] uppercase tracking-wider w-fit mb-sm">
            FYP Project Details
          </div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs leading-tight">
            About EyeGuard<span className="text-primary-container">-XAI</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
            Reliable & Explainable Retinal Disease Screening System
          </p>
        </div>

        <div className="flex flex-col gap-lg">
          {/* Project Summary */}
          <section className="bg-surface-container-lowest rounded-[32px] p-lg border border-outline-variant/30 shadow-[0_8px_30px_rgba(93,31,26,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 bg-primary-container h-full transition-all group-hover:w-2"></div>
            <h2 className="font-h3 text-h3 text-primary-container mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              Project Summary
            </h2>
            <div className="space-y-md text-on-surface-variant font-body-md leading-relaxed">
              <p>
                EyeGuard-XAI is an explainable artificial intelligence platform designed for early retinal disease screening using fundus images. The system supports two operational phases: Doctor Mode and Simple User Mode.
              </p>
              <p>
                Unlike existing black-box screening tools, EyeGuard AI integrates explainable AI (Grad-CAM), uncertainty awareness, and dual-user interaction to enhance transparency and usability.
              </p>
            </div>
          </section>

          {/* Team and Diseases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Team Members */}
            <section className="bg-surface-container-lowest rounded-[32px] p-lg border border-outline-variant/30 shadow-[0_8px_30px_rgba(93,31,26,0.05)]">
              <h3 className="font-h3 text-h3 text-on-surface mb-md pb-xs border-b border-outline-variant/30 flex items-center gap-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                Team Members
              </h3>
              <ul className="space-y-sm">
                <li className="flex justify-between items-center py-sm border-b border-outline-variant/10 last:border-0">
                  <span className="font-body-md font-semibold text-on-surface">Muhammed Usman</span>
                  <span className="font-data-mono text-xs text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">22p-9071</span>
                </li>
                <li className="flex justify-between items-center py-sm border-b border-outline-variant/10 last:border-0">
                  <span className="font-body-md font-semibold text-on-surface">Talha Hanif</span>
                  <span className="font-data-mono text-xs text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">22p-9051</span>
                </li>
              </ul>
              <div className="mt-lg pt-md border-t border-outline-variant/30">
                <p className="font-body-md text-on-surface-variant">
                  Supervisor: <strong className="text-primary-container">Mr. Muhammed Zulqarnain</strong>
                </p>
              </div>
            </section>

            {/* Target Diseases */}
            <section className="bg-surface-container-lowest rounded-[32px] p-lg border border-outline-variant/30 shadow-[0_8px_30px_rgba(93,31,26,0.05)]">
              <h3 className="font-h3 text-h3 text-on-surface mb-md pb-xs border-b border-outline-variant/30 flex items-center gap-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                Target Diseases
              </h3>
              <ul className="grid grid-cols-1 gap-sm">
                {[
                  "Diabetic Retinopathy (DR)",
                  "Age-Related Macular Degeneration (AMD)",
                  "Glaucoma Indicators",
                  "Hypertensive Retinopathy"
                ].map((disease, index) => (
                  <li key={index} className="flex items-center gap-sm text-on-surface-variant font-body-md py-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    {disease}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
