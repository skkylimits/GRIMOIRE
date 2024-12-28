import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// ANSI escape codes for colors
const RED = '\x1B[31m'
const GREEN = '\x1B[32m'
const GREY = '\x1B[90m'
const RESET = '\x1B[0m' // Resets color

// Function to normalize the markdown image links with line numbers
export function updateAssetMetadataInMarkdown(markdown, filePath) {
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

	// Return the updated content (instead of writing it back immediately)
	return content
}

// Function to normalize a single markdown file
export function updateAssetMetadataInMarkdownFile(filePath) {
	try {
		const markdown = fs.readFileSync(filePath, 'utf8')
		const updatedMarkdown = updateAssetMetadataInMarkdown(markdown, filePath) // Pass filePath here

		// If the content is different, write it back and log the change
		if (markdown !== updatedMarkdown) {
			fs.writeFileSync(filePath, updatedMarkdown, 'utf8')
			console.log(`${GREEN}File ${filePath} has been updated${RESET}`)
		}
	}
	catch (err) {
		console.error(`Error processing file: ${filePath}`, err)
	}
}

// Function to update all markdown files in a directory (recursively)
export function updateAssetMetadataInMarkdownsDirectory(dirPath) {
	const EXCLUDED_DIRECTORIES = ['.nuxt', '.output', '.dist', 'node_modules']

	try {
		const files = fs.readdirSync(dirPath)

		files.forEach((file) => {
			const fullPath = path.join(dirPath, file)

			// Skip directories that are in the EXCLUDED_DIRECTORIES array
			const isExcludedDir = EXCLUDED_DIRECTORIES.some(excludedDir =>
				fullPath.includes(excludedDir),
			)

			if (isExcludedDir) {
				// console.log(`Skipping directory: ${fullPath}`)
				return
			}

			if (fs.statSync(fullPath).isDirectory()) {
				// Recursively process directories
				updateAssetMetadataInMarkdownsDirectory(fullPath)
			}
			else if (fullPath.endsWith('.md')) {
				updateAssetMetadataInMarkdownFile(fullPath)
			}
		})
	}
	catch (err) {
		console.error(`Error processing directory: ${dirPath}`, err)
	}
}

// Main function for CLI usage
function main() {
	// Gets the file or folder path you type when running the script
	const inputPath = process.argv[2]

	if (inputPath) {
		// Gets the stats (metadata) of the file or directory at the given input path
		const stat = fs.statSync(inputPath)

		if (stat.isDirectory()) {
			updateAssetMetadataInMarkdownsDirectory(inputPath)
		}
		else if (stat.isFile() && inputPath.endsWith('.md')) {
			updateAssetMetadataInMarkdownFile(inputPath)
		}
		else {
			console.error('Please provide a valid markdown file or directory.')
		}
	}
	else {
		console.error('Please provide a valid file or directory path.')
	}
}

// Only run main if this file is executed directly
if (process.argv[1] === import.meta.url.replace('file://', '')) {
	main()
}
