import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

function updateAltText(filePath) {
	// Read the markdown file
	let content = fs.readFileSync(filePath, 'utf8')

	// Regex to match markdown image syntax ![alt](path)
	const regex = /!\[(.*?)\]\((.*?)\)/g

	// Replace alt text with the image filename without extensions
	content = content.replace(regex, (match, alt, path) => {
		const fileName = path.split('/').pop().split('.')[0] // Extract filename without extension
		return `![${fileName}](${path})` // Replace alt text with filename without extension
	})

	// Write the updated content back to the file
	fs.writeFileSync(filePath, content)
}

function updateCurrentFile() {
	const filePath = process.argv[2] // Get file path from command line argument
	if (!filePath) {
		console.error('No file specified.')
		process.exit(1)
	}
	updateAltText(filePath)
}

updateCurrentFile()
