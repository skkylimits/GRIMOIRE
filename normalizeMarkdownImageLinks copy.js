function normalizeMarkdownImageLinks(markdown) {
	// Regex to match markdown image links: ![alt text](url)
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g

	// Replace the links with normalized paths
	return markdown.replace(regex, (match, altText, url) => {
		// Check if the URL contains 'public' and adjust
		if (url.includes('public')) {
		// Use regex to remove any ../../public from the start of the URL
			url = url.replace(/(\.\.\/)+public/, '/') // This will replace multiple ../public with a single slash

			// If 'public' is directly at the start, remove it
			if (url.startsWith('public/')) {
				url = url.substring(7) // Remove 'public/' from the start
			}
		}

		// Remove any excess slashes (e.g., //// to /)
		url = url.replace(/\/+/g, '/') // This replaces multiple slashes with a single slash

		// If the URL is a simple file name (no slashes), prepend a slash to point to /public
		if (!url.startsWith('/') && !url.includes('/')) {
			url = `/${url}`
		}

		// Return the updated markdown with the modified path
		return `![${altText}](${url})`
	})
}

export default normalizeMarkdownImageLinks
