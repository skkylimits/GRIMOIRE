// tests/e2e/login.spec.ts
import { expect, test } from '@playwright/test'

test('redirect unauthenticated user to /signin', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveURL(/\/signin/)
})

test('simulate GitHub login redirect', async ({ page }) => {
	await page.goto('/signin')

	// Klik op de "GitHub" knop
	await page.getByText('GitHub').click()

	// Mock OAuth callback
	await page.goto('/api/auth/callback/github?code=fake_code')

	// Redirect naar home
	await expect(page).toHaveURL('http://localhost:3000/')
})
