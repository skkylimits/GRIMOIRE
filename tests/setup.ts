// tests/setup.ts
import { vi } from 'vitest'

// ✅ Mock Nuxt helpers globally
global.defineNuxtRouteMiddleware = (fn: any) => fn
global.navigateTo = vi.fn()
global.useAuth = () => ({ status: { value: 'unauthenticated' } })

// Mock composables/plugins that often appear in middleware or pages
global.useRoute = () => ({ path: '/', query: {} })
global.useRuntimeConfig = () => ({ public: {} })
