/* eslint-disable no-console */
import type { ContentNavigationItem } from '@nuxt/content'

export default defineNuxtRouteMiddleware(async (to) => {
	// ⛔️ AUTH ROUTES VOLLEDIG UITSCHAKELEN
	if (
		to.path.startsWith('/signin')
		|| to.path.startsWith('/api/auth')
		|| to.path.startsWith('/callback')
		|| to.path.startsWith('/logout')
	) {
		return
	}

	// ╭──────────────────────────────────────────────────────────╮
	// 📦 TOP-LEVEL COMPONENT GROUP
	// ╰──────────────────────────────────────────────────────────╯
	console.groupCollapsed(
		`%c🧭 docs-redirect.global.ts → ${to.fullPath}`,
		'color:#f7768e;font-weight:bold',
	)

	// ╭───────────────── STEP 1 — CHECK PAGE EXISTS ─────────────────╮
	console.log('🔍 STEP 1 — Checking if a real page exists…')
	const page = await queryCollection('docs').path(to.path).first()

	if (page) {
		console.log('✔️ Page exists — NO redirect required.')
		console.groupEnd()
		return
	}

	console.warn('⚠️ Page does NOT exist → checking navigation…')

	// ╭───────────────── STEP 2 — LOAD NAVIGATION ───────────────────╮
	console.log('📥 STEP 2 — Loading navigation tree…')
	const navigation = (await queryCollectionNavigation('docs')) as ContentNavigationItem[]
	console.log(`📚 Navigation loaded (${navigation.length} root items)`)

	console.groupCollapsed('📂 DEBUG — Navigation full tree')
	console.log(navigation)
	console.groupEnd()

	// ╭───────────────── STEP 3 — MATCH NAV NODE ────────────────────╮
	console.log(`🔎 STEP 3 — Matching nav node for path: "${to.path}"…`)
	const navItem = findNavItemByPath(to.path, navigation)

	if (!navItem) {
		console.warn('❌ No matching nav node — allow 404.')
		console.groupEnd()
		return
	}

	console.groupCollapsed('📌 Matched nav node')
	console.log({
		title: navItem.title,
		path: navItem.path,
		tabs: navItem.tabs,
		childrenCount: navItem.children?.length ?? 0,
		childrenPaths: (navItem.children ?? []).map(c => c.path),
	})
	console.groupEnd()

	// ╭───────────────── STEP 4 — DETERMINE REDIRECT TARGET ─────────╮
	console.log('📘 STEP 4 — Determining redirect target…')
	let target: { path: string } | null = null

	const children = navItem.children ?? [] // ← ALWAYS SAFE ARRAY
	const firstTabChildren = navItem.children?.[0]?.children ?? [] // ← ALWAYS SAFE ARRAY

	if (navItem.tabs && firstTabChildren.length > 0) {
		const [tabGroup] = navItem.children ?? []

		if (!tabGroup) {
			console.warn('❌ tabs:true but FIRST tab group missing — abort redirect')
			console.groupEnd()
			return
		}

		console.groupCollapsed('📁 tabs:true → This page uses a tabbed layout.')
		console.log(`   → Defaulting to FIRST tab: "${tabGroup.title}"`)
		console.log('   → Looking for the FIRST markdown file inside this tab…')
		console.log({
			tabTitle: navItem.children?.[0]?.title,
			tabPath: navItem.children?.[0]?.path,
			groupChildrenCount: firstTabChildren.length,
			groupChildrenPaths: firstTabChildren.map(c => c.path),
		})
		console.groupEnd()

		target = findFirstValidMdNode(firstTabChildren)
	}
	else if (children.length > 0) {
		console.groupCollapsed('📁 DEBUG — no tabs → using direct children')
		console.log({
			childrenCount: children.length,
			childrenPaths: children.map(c => c.path),
		})
		console.groupEnd()

		target = findFirstValidMdNode(children)
	}

	// ╭───────────────── STEP 5 — VALIDATE TARGET ───────────────────╮
	console.log('🧪 STEP 5 — Validating redirect target…')
	if (!target?.path) {
		console.warn('❌ No valid markdown node found → let Nuxt show 404.')
		console.groupEnd()
		return
	}

	console.log(`🎯 VALID TARGET = ${target.path}`)

	// ╭───────────────── STEP 6 — APPLY REDIRECT ────────────────────╮
	console.log('➡️ STEP 6 — Deciding redirect…')
	if (target.path !== to.path) {
		console.log(`🔁 Redirecting to: ${target.path}`)
		console.groupEnd()
		return navigateTo(target.path, { replace: true })
	}

	console.log('ℹ️ Already on correct page — NO redirect applied.')
	console.groupEnd()
})
