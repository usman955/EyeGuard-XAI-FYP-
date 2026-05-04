/**
 * ============================================================================
 * File: mockAI.js
 * Location: utils
 * Purpose: Utility functions, mock data, and helpers for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

// Simulates AI inference on an uploaded image file
// Returns mock probabilities for diseases and mock heatmap parameters

export const simulateAIInference = async (imageFile) => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Generate deterministic-looking random numbers based on file size/name
      // so the same image gives the same result in a demo
      let seed = imageFile.size || 100;
      if (imageFile.name) {
        seed += imageFile.name.charCodeAt(0) * 10;
      }
      
      const pseudoRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      // Generate base probabilities
      let drProb = pseudoRandom();
      let glaucProb = pseudoRandom();
      let amdProb = pseudoRandom();
      let hrProb = pseudoRandom();

      // Normalize so one is usually dominant but not always
      const max = Math.max(drProb, glaucProb, amdProb, hrProb);
      const isHealthy = pseudoRandom() > 0.7; // 30% chance to be completely healthy

      if (isHealthy) {
        drProb *= 0.1;
        glaucProb *= 0.1;
        amdProb *= 0.1;
        hrProb *= 0.1;
      } else {
        // Boost the dominant one
        if (max === drProb) drProb = Math.min(0.95, drProb + 0.3);
        if (max === glaucProb) glaucProb = Math.min(0.92, glaucProb + 0.3);
        if (max === amdProb) amdProb = Math.min(0.88, amdProb + 0.3);
        if (max === hrProb) hrProb = Math.min(0.85, hrProb + 0.3);
      }

      // Generate heatmap hotspots (x, y, radius, intensity)
      const hotspots = [];
      const numHotspots = isHealthy ? 1 : Math.floor(pseudoRandom() * 4) + 2;
      
      for (let i = 0; i < numHotspots; i++) {
        hotspots.push({
          x: 0.2 + pseudoRandom() * 0.6, // Relative to image width (0-1)
          y: 0.2 + pseudoRandom() * 0.6, // Relative to image height
          radius: 0.1 + pseudoRandom() * 0.2,
          intensity: isHealthy ? 0.3 : 0.5 + pseudoRandom() * 0.5
        });
      }

      // Formatting results
      const results = [
        { name: 'Diabetic Retinopathy', key: 'dr', probability: drProb, risk: getRiskLevel(drProb) },
        { name: 'Glaucoma', key: 'glaucoma', probability: glaucProb, risk: getRiskLevel(glaucProb) },
        { name: 'Age-Related Macular Degeneration', key: 'amd', probability: amdProb, risk: getRiskLevel(amdProb) },
        { name: 'Hypertensive Retinopathy', key: 'hr', probability: hrProb, risk: getRiskLevel(hrProb) },
      ];

      // Sort by probability descending
      results.sort((a, b) => b.probability - a.probability);

      resolve({
        id: `scn_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        overallStatus: isHealthy ? 'Healthy' : 'At Risk',
        predictions: results,
        heatmapData: hotspots
      });
    }, 2000); // 2 second mock delay
  });
};

const getRiskLevel = (prob) => {
  if (prob < 0.3) return 'Low';
  if (prob < 0.6) return 'Moderate';
  return 'High';
};
