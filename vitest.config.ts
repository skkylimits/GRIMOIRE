/**
 * 🧪 Vitest Configuration
 *
 * 🔸 Scheidt unit tests (alleen tests/unit)
 * 🔸 Genereert coverage (v8 provider)
 * 🔸 Gebruikt test-specifieke tsconfig
 * 🔸 Compatibel met CI (GitHub Actions)
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // 🔹 Zorgt dat describe(), it(), expect() overal werken zonder imports
    environment: 'node', // 🔹 Draait tests in Node.js i.p.v. een browseromgeving
    setupFiles: ['./tests/setup.ts'], // 🔹 Laadt mocks en globale helpers vóór alle tests
    include: ['tests/unit/**/*.spec.ts'], // 🔹 Specificeert alleen unit tests (geen e2e of integratietests)
    coverage: { // 🔹 Genereert code coverage rapporten voor inzicht in testdekking
      provider: 'v8', // 🔹 Snel & betrouwbaar: gebruikt V8-engine
      reporter: ['text', 'json', 'html'] // 🔹 Terminal, machineleesbaar en visueel rapport
    }
  },
  esbuild: {
    // 👇 Zorgt dat Vitest jouw aparte test-tsconfig gebruikt
    tsconfigRaw: require('./tsconfig.test.json')
  }
})

// In mocks en test setup is leesbaarheid en eenvoud belangrijker dan type-nauwkeurigheid.
// ✅ typesafety = superbelangrijk in je app
// ⛔ niet in je tests
