function normalizeMarkdownImageLinks(markdown) {
	// Regex to match markdown image links: ![alt text](url)
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g

	// Replace the links with normalized paths
	return markdown.replace(regex, (match, altText, url) => {
		// Edge case: If URL contains 'https://', 'http://', or any full URL, don't modify
		if (url.startsWith('http://') || url.startsWith('https://')) {
			// Leave the URL unchanged if it starts with 'http' or 'https'
			return `![${altText}](${url})`
		}

		// Normalize paths containing 'public'
		if (url.includes('public')) {
			// Replace multiple levels of ../public with root paths
			url = url.replace(/(\.\.\/)+public/, '/')

			// Remove 'public/' only if it's at the start
			if (url.startsWith('public/')) {
				url = url.substring(7) // Remove 'public/' prefix
			}
		}

		// Normalize excess slashes (e.g., //// to /)
		url = url.replace(/\/+/g, '/')

		// Ensure paths without slashes get prefixed with '/'
		if (!url.startsWith('/') && !url.includes('/')) {
			url = `/${url}`
		}

		// Return the updated markdown with the modified path
		return `![${altText}](${url})`
	})
}
// Test cases

const testCases = [
	// Edge Case: URL is a full HTTP(S) URL with ../public
	{
		input: '![example](https://example.com/../public/content/logo.png)',
		expected: '![example](https://example.com/../public/content/logo.png)',
	},
	// Normal Case: Relative path with ../public
	{
		input: '![alt text](../../../../public/content/auto-imgager.png)',
		expected: '![alt text](/content/auto-imgager.png)',
	},
	// Case with public/ at the start
	{
		input: '![alt text](public/auto-imgager.png)',
		expected: '![alt text](/auto-imgager.png)',
	},
	// Case with one level deep ../public
	{
		input: '![alt text](../public/content/auto-imgager.png)',
		expected: '![alt text](/content/auto-imgager.png)',
	},
	// Excess slashes in path
	{
		input: '![alt text](////content/auto-imgager.png)',
		expected: '![alt text](/content/auto-imgager.png)',
	},
	// Simple file without slashes
	{
		input: '![alt text](auto-imgager.png)',
		expected: '![alt text](/auto-imgager.png)',
	},
]

testCases.forEach(({ input, expected }, index) => {
	const result = normalizeMarkdownImageLinks(input)
	console.log(`Case ${index + 1}:`, result === expected ? 'Pass ✅' : `Fail ❌ (Got: ${result})`)
})
