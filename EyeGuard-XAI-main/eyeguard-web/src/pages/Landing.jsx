import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Hero Section with Organic Wave */}
      <main className="w-full px-4 md:px-lg py-lg max-w-[1200px] mx-auto organic-wave-bg">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-lg items-center mb-xl pt-16">
          <div className="md:col-span-5 flex flex-col gap-md">
            <div className="inline-block px-4 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-caps text-[10px] uppercase tracking-wider w-fit">
              ✨ Next-Gen AI Screening Platform
            </div>
            <h1 className="font-h1 text-h1 text-on-surface leading-tight">
              See The Future With <br/>
              <span className="text-primary-container">EyeGuard-XAI</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Reliable & Explainable Retinal Disease Screening System. 
              Early detection of Diabetic Retinopathy, Glaucoma, and AMD powered by advanced Explainable AI.
            </p>
            <div className="flex flex-wrap gap-md mt-sm">
              <Link 
                to="/register" 
                className="bg-primary text-on-primary font-h3 text-h3 py-md px-xl rounded-full shadow-[0_8px_30px_rgba(93,31,26,0.15)] hover:scale-105 transition-transform flex items-center gap-sm"
              >
                <span className="material-symbols-outlined">document_scanner</span> 
                Start Screening Now
              </Link>
              <Link 
                to="/about" 
                className="bg-white text-primary border border-primary/20 font-h3 text-h3 py-md px-xl rounded-full hover:bg-surface-container-low transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(93,31,26,0.1)] border border-surface-variant relative">
              <img 
                alt="EyeGuard AI illustration" 
                className="w-full h-auto object-cover aspect-[4/5]" 
                src="/images/retinal_scan.png" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-xl">
          <div className="text-center mb-lg">
            <h2 className="font-h2 text-h2 text-on-surface mb-xs">Platform <span className="text-primary-container">Capabilities</span></h2>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
              Built for both medical professionals and general users with specialized interfaces and state-of-the-art AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] flex flex-col gap-sm hover:-translate-y-1 transition-transform relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-fixed-dim transition-all group-hover:h-2"></div>
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-xs">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">Doctor Mode</h3>
              <p className="font-body-md text-on-surface-variant">
                Upload patient retinal images to receive multi-disease predictions with calibrated probabilities and clinical management tools.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-[0_4px_20px_-4px_rgba(93,31,26,0.08)] flex flex-col gap-sm hover:-translate-y-1 transition-transform relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-fixed-dim transition-all group-hover:h-2"></div>
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-xs">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">Explainable AI</h3>
              <p className="font-body-md text-on-surface-variant">
                Go beyond black-box predictions. Visual Grad-CAM heatmaps highlight exact pathological regions on the retina for clinical verification.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-primary-container text-on-primary-container rounded-xl p-md shadow-[0_8px_30px_rgba(93,31,26,0.15)] flex flex-col gap-sm relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
              <div className="w-12 h-12 rounded-lg bg-on-primary-container/20 flex items-center justify-center text-on-primary-container mb-xs z-10">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
              </div>
              <h3 className="font-h3 text-h3 z-10">Educational Chatbot</h3>
              <p className="font-body-md text-on-primary-container/80 z-10">
                Interactive guidance for patients to understand symptoms, get awareness information, and learn about maintaining eye health.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-surface-container-high rounded-[32px] p-lg md:p-xl text-center mb-xl relative overflow-hidden border border-outline-variant/30">
          <div className="absolute inset-0 organic-wave opacity-5 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-md">
            <h2 className="font-h1 text-h1 text-primary-container">Ready to preserve your vision?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-xl">
              Join thousands of users who trust EyeGuard-XAI for early detection and reliable screening results.
            </p>
            <Link 
              to="/register" 
              className="bg-primary-container text-on-primary font-h3 text-h3 py-md px-xl rounded-full shadow-lg hover:bg-primary transition-colors inline-flex items-center gap-sm"
            >
              Get Started Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 py-lg mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-sm">
            <span className="text-xl font-bold text-[#5D1F1A] font-h3 tracking-tight">EyeGuard-XAI</span>
            <span className="text-stone-400">|</span>
            <span className="text-on-surface-variant text-sm font-label-caps">Reliable & Explainable Screening</span>
          </div>
          <div className="flex gap-lg text-sm text-on-surface-variant">
            <Link to="/about" className="hover:text-primary-container transition-colors">About Project</Link>
            <a href="#" className="hover:text-primary-container transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-container transition-colors">Terms of Service</a>
          </div>
          <div className="text-stone-400 text-sm font-data-mono">
            © 2024 EyeGuard-XAI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
