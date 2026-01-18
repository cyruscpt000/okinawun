
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base 必須對應你的 GitHub Repository 名稱
  base: '/okinawun/',
  define: {
    // 確保 process.env.API_KEY 在編譯時能被正確處理
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
