// vite.config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
    markdown: {
        // Enable table of contents
        toc: {
            includeLevel: [2, 3] // Include first and second-level headings
        }
    }
})
