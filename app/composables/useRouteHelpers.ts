import type { ContentNavigationItem } from '@nuxt/content'

// Functie om een nav item te vinden op basis van pad
export function findNavItemByPath(path: string, navItems: ContentNavigationItem[]): ContentNavigationItem | undefined {
	for (const item of navItems) {
		if (item.path === path)
			return item
		if (item.children) {
			const found = findNavItemByPath(path, item.children)
			if (found)
				return found
		}
	}
	return undefined
}

// Zoekt het eerste item met een 'stem' (Markdown node)
export function findFirstValidMdNode(items: ContentNavigationItem[]): ContentNavigationItem | null {
	for (const item of items) {
		if (item.children?.length) {
			const found = findFirstValidMdNode(item.children)
			if (found)
				return found
		}
		else if (item.stem) {
			return item
		}
	}
	return null
}

// Functie om het geldige pad te vinden
export function findValidNavPath(currentPath: string, navItems: ContentNavigationItem[]) {
	let currentNav = findNavItemByPath(currentPath, navItems)
	let searchPath = currentPath

	while (currentNav) {
		if (currentNav.standalone) {
			return { node: currentNav, type: 'standalone', path: searchPath }
		}
		if (currentNav.stripped) {
			return { node: currentNav, type: 'stripped', path: searchPath }
		}
		if (currentNav.tabs) {
			return { node: currentNav, type: 'tabs', path: searchPath }
		}

		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath)
			break
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}

	return null
}

export function findTabsNavNode(currentPath: string, navItems: ContentNavigationItem[]): ContentNavigationItem | null {
	let searchPath = currentPath
	let currentNav = findNavItemByPath(searchPath, navItems)

	while (currentNav) {
		if (currentNav.tabs) {
			return currentNav
		}
		const parentPath = searchPath.split('/').slice(0, -1).join('/')
		if (!parentPath)
			break
		searchPath = parentPath
		currentNav = findNavItemByPath(searchPath, navItems)
	}
	return null
}

// 🛠 Helper function to extract the last number in `stem`
export function extractSortNumber(stem: string): number {
	const parts = stem.split('/') // Split by "/"
	const lastPart = parts[parts.length - 1] // Get the last segment
	const match = lastPart ? lastPart.match(/^(\d+)/) : null // Extract leading number
	return match && match[1] ? Number.parseInt(match[1], 10) : 1000 // Default to 1000 if no number found
}

// 🛠 Recursive sorting function
export function sortItems(items: ContentNavigationItem[]): ContentNavigationItem[] {
	return items
		.map(item => ({
			...item,
			children: item.children ? sortItems(item.children) : [], // Recursively sort children
		}))
		.sort((a, b) => extractSortNumber(a.stem || '') - extractSortNumber(b.stem || ''))
}
