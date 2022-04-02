import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'RTTJ WEB APP',
        short_name: 'RTTJ',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '.',
        icons: [
          {
            src: '/icons/icon-96-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/icon-128-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/icon-256-256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      strategies: 'injectManifest',
    })
  ]
})
