import { spawn } from 'node:child_process'
import { performance } from 'node:perf_hooks'
import {
	getGitBranch,
	getGitCommit,
	getNuxtVersion,
	readJsonSafe,
	writeJson,
} from '../helpers/index.js'

console.log('⏱️ Measuring Nuxt build time (with nested phase JSON)...')

// 🕒 Start timer
const start = performance.now()
const proc = spawn('pnpm', ['run', 'build'])

const phases = {
	nuxtInitStart: start,
	viteClientStart: null,
	viteClientEnd: null,
	viteServerStart: null,
	viteServerEnd: null,
	nitroStart: null,
	nitroEnd: null,
	prerenderStart: null,
	prerenderEnd: null,
	outputEnd: null,
}

proc.stdout.on('data', (data) => {
	const text = data.toString()
	process.stdout.write(text)

	// --- Nuxt & Vite fases ---
	if (text.includes('Building client...'))
		phases.viteClientStart = performance.now()
	if (text.match(/Client built in ([\d.]+)m?s/))
		phases.viteClientEnd = performance.now()

	if (text.includes('Building server...'))
		phases.viteServerStart = performance.now()
	if (text.match(/Server built in ([\d.]+)m?s/))
		phases.viteServerEnd = performance.now()

	// --- Nitro fase ---
	if (text.includes('Building Nuxt Nitro server'))
		phases.nitroStart = performance.now()
	if (text.includes('Nuxt Nitro server built'))
		phases.nitroEnd = performance.now()

	// --- Prerender fase ---
	if (text.includes('Initializing prerenderer'))
		phases.prerenderStart = performance.now()
	if (text.includes('Prerendered'))
		phases.prerenderEnd = performance.now()

	// --- Output finalize ---
	if (
		text.includes('Generated public')
		|| text.includes('Output directory:')
		|| text.match(/Built in [\d.]+s$/)
	) {
		phases.outputEnd = performance.now()
	}
})

proc.stderr.on('data', data => process.stderr.write(data))

proc.on('close', (code) => {
	const total = (performance.now() - start) / 1000

	if (code !== 0) {
		console.error('❌ Build failed.')
		process.exit(code)
	}

	// --- Berekeningen ---
	const flatMetrics = {
		nuxtInit: (phases.viteClientStart - phases.nuxtInitStart) / 1000,
		viteClient: (phases.viteClientEnd - phases.viteClientStart) / 1000,
		viteServer: (phases.viteServerEnd - phases.viteServerStart) / 1000,
		nitro: (phases.nitroEnd - phases.viteServerEnd) / 1000,
		prerender:
      phases.prerenderStart && phases.prerenderEnd
      	? (phases.prerenderEnd - phases.prerenderStart) / 1000
      	: 0,
		finalize:
      phases.outputEnd && phases.prerenderEnd
      	? (phases.outputEnd - phases.prerenderEnd) / 1000
      	: 0,
	}

	// --- Console output (ongewijzigd) ---
	console.log('\n─────────────────────────────────────────────')
	console.log('🏗️ Build voltooid!')
	console.log('─────────────────────────────────────────────')
	console.log(`🧱 Fase 1: Nuxt init        – ${flatMetrics.nuxtInit.toFixed(2)}s`)
	console.log(`⚙️ Fase 2: Vite client      – ${flatMetrics.viteClient.toFixed(2)}s`)
	console.log(`🧩 Fase 3: Vite server      – ${flatMetrics.viteServer.toFixed(2)}s`)
	console.log(`🔥 Fase 4: Nitro build      – ${flatMetrics.nitro.toFixed(2)}s`)
	if (flatMetrics.prerender > 0)
		console.log(`🌐 Fase 5: Prerender routes  – ${flatMetrics.prerender.toFixed(2)}s`)
	if (flatMetrics.finalize > 0)
		console.log(`📦 Fase 6: Output finalize   – ${flatMetrics.finalize.toFixed(2)}s`)
	console.log('─────────────────────────────────────────────')
	console.log(`✅ Totale buildtijd          – ${total.toFixed(2)}s`)
	console.log('─────────────────────────────────────────────\n')

	saveMetric(total, flatMetrics)
})

/* ------------------------------------------------------------------
 💾 SAVE METRICS — gebruikt helpers voor veilige JSON I/O
------------------------------------------------------------------- */
function saveMetric(total, flatMetrics) {
	const logFile = 'metrics/build-times.json'
	const metrics = readJsonSafe(logFile, [])

	const entry = {
		timestamp: new Date().toISOString(),
		gitCommit: getGitCommit(),
		branch: getGitBranch(),
		nodeVersion: process.version,
		nuxtVersion: getNuxtVersion(),
		buildSeconds: total,
		phases: {
			nuxtInit: flatMetrics.nuxtInit,
			vite: {
				client: flatMetrics.viteClient,
				server: flatMetrics.viteServer,
			},
			nitro: {
				build: flatMetrics.nitro,
				prerender: flatMetrics.prerender,
				finalize: flatMetrics.finalize,
			},
		},
	}

	metrics.push(entry)
	writeJson(logFile, metrics)
	console.log(`💾 Metrics opgeslagen → ${logFile}`)
}

// ┌─────────────────────────────────────────────────────────────┐
// │                 🧠 NUXT BUILD TIMELINE                     │
// └─────────────────────────────────────────────────────────────┘
//
// Time →
// │
// │   0.000s ────────► Script start (Date.now())
// │                    ↓
// │                    [SPAWN pnpm run build]
// │                    └── Buildfase wordt geïnitialiseerd
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 1 – Nuxt init                                          │
// │   └─────────────────────────────────────────────────────────────┘
// │        Tijd tussen scriptstart en start van de eerste Vite fase.
// │        → measured as: (viteClientStart - nuxtInitStart)
// │
// │        🔹 Wat gebeurt hier?
// │           - Nuxt initialiseert zijn build context.
// │           - Config parsing, module discovery, bundler setup.
// │           - SSR-engine en Nitro-config worden geladen.
// │
// │
// │   2.8s ────────► "Building client..." verschijnt
// │                   ↓
// │                   phases.viteClientStart = now()
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 2 – Vite client build                                 │
// │   └─────────────────────────────────────────────────────────────┘
// │        Duur tussen "Building client..." en "Client built in XXms".
// │        → measured as: (viteClientEnd - viteClientStart)
// │
// │        🔹 Wat gebeurt hier?
// │           - Client bundling via Vite.
// │           - CSS, JS en Vue componenten worden gebundeld.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 3 – Vite server build                                 │
// │   └─────────────────────────────────────────────────────────────┘
// │        Duur tussen "Building server..." en "Server built in XXms".
// │        → measured as: (viteServerEnd - viteServerStart)
// │
// │        🔹 Wat gebeurt hier?
// │           - Server-bundel wordt gemaakt voor SSR.
// │           - Modulegraph en render-entry worden voorbereid.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 4 – Nitro build                                       │
// │   └─────────────────────────────────────────────────────────────┘
// │        Duur tussen "Building Nuxt Nitro server" en
// │        "Nuxt Nitro server built".
// │        → measured as: (nitroEnd - viteServerEnd)
// │
// │        🔹 Wat gebeurt hier?
// │           - Nitro backend wordt gegenereerd.
// │           - API-routes, middleware en assets worden opgebouwd.
// │           - Dit is meestal de zwaarste fase van de build.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 5 – Prerender                                         │
// │   └─────────────────────────────────────────────────────────────┘
// │        Duur tussen "Initializing prerenderer" en "Prerendered".
// │        → measured as: (prerenderEnd - prerenderStart)
// │
// │        🔹 Wat gebeurt hier?
// │           - Alle statische routes worden voorgerenderd.
// │           - Content wordt geëxporteerd naar .output/public.
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ FASE 6 – Finalize                                          │
// │   └─────────────────────────────────────────────────────────────┘
// │        Duur tussen "Prerendered" en "Output directory:".
// │        → measured as: (outputEnd - prerenderEnd)
// │
// │        🔹 Wat gebeurt hier?
// │           - Resultaatbestanden worden geschreven.
// │           - Build manifest, hashes, en .output worden afgerond.
// │
// │
// │   49.8s ────────► Build voltooid
// │                   ↓
// │                   totalBuildTime = (now - start)
// │                   ✅ JSON opgeslagen met alle fasetijden
// │
// │
// │   ┌─────────────────────────────────────────────────────────────┐
// │   │ STRUCTUUR VAN METRIC ENTRY                                 │
// │   └─────────────────────────────────────────────────────────────┘
// │
// │   {
// │     "timestamp": "2025-10-08T22:05:21.228Z",
// │     "gitCommit": "0916dce",
// │     "branch": "v4",
// │     "nodeVersion": "v22.17.1",
// │     "nuxtVersion": "^4.1.2",
// │     "buildSeconds": 49.775,
// │     "phases": {
// │       "nuxtInit": 2.862,
// │       "vite": {
// │         "client": 6.905,
// │         "server": 3.625
// │       },
// │       "nitro": {
// │         "build": 34.331,
// │         "prerender": 12.675,
// │         "finalize": 0.104
// │       }
// │     }
// │   }
// │
// │   🔹 buildSeconds ≠ som van fasen
// │      → omdat sommige fasen parallel lopen (vite/nitro)
// │
// └─────────────────────────────────────────────────────────────┘
