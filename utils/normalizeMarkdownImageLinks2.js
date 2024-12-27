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

// Example usage:

// Case 1: Nested path with multiple levels of ../public/
const markdown1 = '![alt text](../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
const updatedMarkdown1 = normalizeMarkdownImageLinks(markdown1)
console.log(updatedMarkdown1) // Expected: ![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)

// Case 2: Root level with public/
const markdown2 = '![alt text](public/auto-imgager.png)'
const updatedMarkdown2 = normalizeMarkdownImageLinks(markdown2)
console.log(updatedMarkdown2) // Expected: ![alt text](auto-imgager.png)

// Case 3: One level deep with ../public/
const markdown3 = '![alt text](../public/content/auto-imgager.png)'
const updatedMarkdown3 = normalizeMarkdownImageLinks(markdown3)
console.log(updatedMarkdown3) // Expected: ![alt text](content/auto-imgager.png)

// Case 4: Nested path with `public/` in a more complex path
const markdown4 = '![alt text](/../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
const updatedMarkdown4 = normalizeMarkdownImageLinks(markdown4)
console.log(updatedMarkdown4) // Expected: ![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)

// Case 5: Excess slashes (should normalize to a single slash)
const markdown5 = '![alt text](////content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
const updatedMarkdown5 = normalizeMarkdownImageLinks(markdown5)
console.log(updatedMarkdown5) // Expected: ![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)

// Case 6: Excess slashes (should normalize to a single slash)
const markdown6 = '![alt text](///content/auto-imgager.png)'
const updatedMarkdown6 = normalizeMarkdownImageLinks(markdown6)
console.log(updatedMarkdown6) // Expected: ![alt text](/content/auto-imgager.png)

// Case 7: Protocol-relative URL with excess slashes
const markdown7 = '![alt text](//content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
const updatedMarkdown7 = normalizeMarkdownImageLinks(markdown7)
console.log(updatedMarkdown7) // Expected: ![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)

// Case 8: Simple file (no directory), should add a slash
const markdown8 = '![alt text](auto-imgager.png)'
const updatedMarkdown8 = normalizeMarkdownImageLinks(markdown8)
console.log(updatedMarkdown8) // Expected: ![alt text](/auto-imgager.png)

export default normalizeMarkdownImageLinks
