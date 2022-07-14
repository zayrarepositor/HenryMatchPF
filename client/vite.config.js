import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   base: "https://henrymatch-pg.herokuapp.com",
   plugins: [react()],
   build: {
     chunkSizeWarningLimit: 1600,
   },
   
 })
