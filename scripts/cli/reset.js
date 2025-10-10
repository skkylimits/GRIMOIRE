// scripts/reset.js
import { execSync } from 'node:child_process'
import { diff, formatSeconds } from '../helpers/index.js' // let op: 'helpers', niet 'helper'

const start = Date.now()

console.log('🧹 Project cold reset gestart...\n')

// 1️⃣ Bestanden verwijderen
const targets = ['node_modules', '.nuxt', '.output', '.cache', 'dist', 'pnpm-lock.yaml']

for (const target of targets) {
	try {
		execSync(`rm -rf ${target}`)
		console.log(`🗑️  Verwijderd: ${target}`)
	}
	catch (err) {
		console.warn(`⚠️  Kon ${target} niet verwijderen: ${err.message}`)
	}
}

console.log('\n📦 Dependencies opnieuw installeren...\n')

// 2️⃣ Dependencies opnieuw installeren
try {
	execSync('pnpm install', { stdio: 'inherit' })
}
catch (err) {
	console.error('\n❌ Installatie mislukt:', err.message)
	process.exit(1)
}

// 3️⃣ Klaar-melding met tijd
console.log(`\n✅ Klaar in ${formatSeconds(diff(Date.now(), start))}`)
