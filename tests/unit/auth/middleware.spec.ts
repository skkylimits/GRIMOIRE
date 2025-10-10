// tests/unit/auth/middleware.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('auth.global middleware', () => {
  let authMiddleware: any

  beforeEach(async () => {
    // Reset mocks voor elke test
    global.navigateTo = vi.fn()
    global.useAuth = () => ({ status: { value: 'unauthenticated' } })

    // Import opnieuw (middleware haalt `useAuth` dynamisch op)
    const mod = await import('../../../app/middleware/auth.global')
    authMiddleware = mod.default
  })

  it('redirects unauthenticated users to /signin', async () => {
    await authMiddleware({ path: '/dashboard' })
    expect(global.navigateTo).toHaveBeenCalledWith('/signin')
  })

  it('allows unauthenticated users to access /signin', async () => {
    await authMiddleware({ path: '/signin' })
    expect(global.navigateTo).not.toHaveBeenCalled()
  })

  it('redirects authenticated users away from /signin to /', async () => {
    global.useAuth = () => ({ status: { value: 'authenticated' } })
    const mod = await import('../../../app/middleware/auth.global')
    const middleware = mod.default

    await middleware({ path: '/signin' })
    expect(global.navigateTo).toHaveBeenCalledWith('/')
  })

  it('lets authenticated users access protected routes', async () => {
    global.useAuth = () => ({ status: { value: 'authenticated' } })
    const mod = await import('../../../app/middleware/auth.global')
    const middleware = mod.default

    await middleware({ path: '/dashboard' })
    expect(global.navigateTo).not.toHaveBeenCalled()
  })
})
