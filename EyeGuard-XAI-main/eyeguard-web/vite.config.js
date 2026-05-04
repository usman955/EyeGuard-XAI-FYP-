/**
 * ============================================================================
 * File: vite.config.js
 * Location: eyeguard-web
 * Purpose: Core configuration, initialization, or entry point for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
