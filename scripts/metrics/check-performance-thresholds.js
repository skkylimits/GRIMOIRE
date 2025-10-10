// scripts/metrics/check-performance-thresholds.js
import fs from 'node:fs'

console.log('🔍 Checking performance thresholds...')

// Detect CI environment
const isCI
	= process.env.CI === 'true'
		|| process.env.GITHUB_ACTIONS === 'true'
		|| process.env.DOCKER_ENV === 'true'

// Thresholds: lokaal strenger, CI ruimer
const THRESHOLDS_LOCAL = {
	devStartupSeconds: 8,
	buildSeconds: 60,
	previewStartupSeconds: 5,
}

const THRESHOLDS_CI = {
	devStartupSeconds: 15,
	buildSeconds: 90,
	previewStartupSeconds: 8,
}

const THRESHOLDS = isCI ? THRESHOLDS_CI : THRESHOLDS_LOCAL

console.log(`🏗️ Using ${isCI ? 'CI' : 'local'} thresholds:`)
console.table(THRESHOLDS)

function checkFile(path, type) {
	if (!fs.existsSync(path)) {
		console.warn(`⚠️ ${path} not found, skipping.`)
		return false
	}

	const data = JSON.parse(fs.readFileSync(path, 'utf-8'))
	const last = data[data.length - 1]
	if (!last)
		return false

	const totalKey = `${type}Seconds`
	const total = last[totalKey]
	const limit = THRESHOLDS[totalKey]

	if (!limit)
		return false

	if (total > limit) {
		console.error(`❌ ${type} too slow: ${total.toFixed(2)}s (limit ${limit}s)`)
		return true
	}

	console.log(`✅ ${type} within limits (${total.toFixed(2)}s)`)
	return false
}

const results = [
	checkFile('metrics/dev-startup-times.json', 'devStartup'),
	checkFile('metrics/build-times.json', 'build'),
	checkFile('metrics/preview-startup-times.json', 'previewStartup'),
]

if (results.some(Boolean)) {
	console.error('🚨 Performance thresholds exceeded. Failing CI run.')
	process.exit(1)
}
else {
	console.log('🎯 All metrics within limits.')
}
