import { defineConfig } from 'vite'
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** Vite no empaqueta <script src="carousel.js"> clásicos; los copiamos a dist. */
function copyCarouselScripts() {
  const dirs = [
    'carousel-fullscreen',
    'carousel-cards',
    'carousel-fade',
    'carousel-skew',
    'carousel-stacked',
    'carousel-deck-3d',
    'carousel-social-feed',
  ]
  return {
    name: 'copy-carousel-js',
    closeBundle() {
      const outDir = join(__dirname, 'dist')
      for (const dir of dirs) {
        const src = join(__dirname, dir, 'carousel.js')
        const dest = join(outDir, dir, 'carousel.js')
        if (existsSync(src)) {
          mkdirSync(dirname(dest), { recursive: true })
          copyFileSync(src, dest)
        }
      }
      const deckImages = join(__dirname, 'carousel-deck-3d', 'images')
      if (existsSync(deckImages)) {
        cpSync(deckImages, join(outDir, 'carousel-deck-3d', 'images'), { recursive: true })
      }
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: mode === 'gh-pages' ? '/carruseles/' : '/',
  plugins: [copyCarouselScripts()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        fullscreen: resolve(__dirname, 'carousel-fullscreen/index.html'),
        cards: resolve(__dirname, 'carousel-cards/index.html'),
        fade: resolve(__dirname, 'carousel-fade/index.html'),
        skew: resolve(__dirname, 'carousel-skew/index.html'),
        stacked: resolve(__dirname, 'carousel-stacked/index.html'),
        deck3d: resolve(__dirname, 'carousel-deck-3d/index.html'),
        social: resolve(__dirname, 'carousel-social-feed/index.html'),
        ticker: resolve(__dirname, 'carousel-ticker/index.html'),
      },
    },
  },
}))
