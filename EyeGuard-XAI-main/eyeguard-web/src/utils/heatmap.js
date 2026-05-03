// Utility to draw a simulated Grad-CAM heatmap over an image on a canvas

export const drawHeatmap = (canvas, imageSrc, hotspots) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  img.onload = () => {
    // Match canvas to image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw base image
    ctx.drawImage(img, 0, 0);

    // Create a temporary canvas for the heatmap
    const heatCanvas = document.createElement('canvas');
    heatCanvas.width = canvas.width;
    heatCanvas.height = canvas.height;
    const heatCtx = heatCanvas.getContext('2d');

    // Draw hotspots
    hotspots.forEach(spot => {
      const x = spot.x * canvas.width;
      const y = spot.y * canvas.height;
      const r = spot.radius * Math.min(canvas.width, canvas.height);

      const gradient = heatCtx.createRadialGradient(x, y, 0, x, y, r);
      // Red at center (high intensity), fading out
      gradient.addColorStop(0, `rgba(255, 0, 0, ${spot.intensity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 0, ${spot.intensity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

      heatCtx.fillStyle = gradient;
      heatCtx.beginPath();
      heatCtx.arc(x, y, r, 0, Math.PI * 2);
      heatCtx.fill();
    });

    // Colorize and blend
    ctx.globalAlpha = 0.6; // Heatmap opacity
    ctx.globalCompositeOperation = 'multiply'; // Blend mode similar to Grad-CAM overlays
    ctx.drawImage(heatCanvas, 0, 0);
    
    // Reset context
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  };

  img.src = imageSrc;
};
