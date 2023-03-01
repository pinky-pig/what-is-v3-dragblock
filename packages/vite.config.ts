import { resolve } from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig(async () => {
  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      UnoCSS(),
    ],

  }
})
