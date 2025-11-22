// scripts/reset-metrics.js
import fs from 'node:fs'

const files = ['metrics/build-times.json', 'metrics/dev-startup-times.json', 'metrics/preview-startup-times.json']

for (const file of files) {
	try {
		fs.writeFileSync(file, '[]')
		console.log(`🧹 Reset ${file}`)
	}
	catch (err) {
		console.error(`❌ Kon ${file} niet resetten:`, err.message)
	}
}

console.log('✅ Metrics measurement reset klaar.')
