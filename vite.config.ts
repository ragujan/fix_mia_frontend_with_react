import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:"localhost",
    port:5173
    // proxy: {
    //   '/frontend': {
    //     target: "http://localhost:8080",
    //     changeOrigin: true,
    //     secure: false,
    //     // ws:true
    //     // rewrite: path => path.replace('/frontend', ''),
    //   }
    // }
  }
})
