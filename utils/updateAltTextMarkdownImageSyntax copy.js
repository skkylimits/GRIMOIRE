import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Function to update alt text in markdown
function updateAltTextInMarkdown(markdown) {
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g // Match ![alt](url)

	return markdown.replace(regex, (match, altText, url) => {
		// Get the filename without extension
		const filename = path.basename(url)
		const nameWithoutExt = path.parse(filename).name

		// Replace alt text with the filename
		return `![${nameWithoutExt}](${url})`
	})
}

// Main function
function main() {
	const filePath = process.argv[2] // Get the file path from arguments

	if (!filePath) {
		console.error('Please provide a markdown file path.')
		process.exit(1)
	}

	try {
		// Read markdown content
		const markdown = fs.readFileSync(filePath, 'utf8')
		const updatedMarkdown = updateAltTextInMarkdown(markdown)

		// Write back the updated content
		fs.writeFileSync(filePath, updatedMarkdown, 'utf8')
		console.log(`Updated alt text in: ${filePath}`)
	}
	catch (err) {
		console.error(`Error processing file: ${filePath}`, err)
	}
}

// Only run main if this file is executed directly
if (process.argv[1] === import.meta.url.replace('file://', '')) {
	main()
}
