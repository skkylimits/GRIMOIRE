import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

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

function normalizeMarkdownFile(filePath) {
	try {
		// Read the file content
		const markdown = fs.readFileSync(filePath, 'utf8')

		// Normalize the content
		const normalizedMarkdown = normalizeMarkdownImageLinks(markdown)

		// If the content is different, write it back and log the change
		if (markdown !== normalizedMarkdown) {
			fs.writeFileSync(filePath, normalizedMarkdown, 'utf8')
			console.log(`File ${filePath} has been normalized.`)
		}
		else {
			console.log(`No changes made to ${filePath}.`)
		}
	}
	catch (err) {
		console.error(`Error processing file: ${filePath}`, err)
	}
}

// Function to process all markdown files in a directory (recursively)
function processMarkdownFilesInDirectory(dirPath) {
	try {
		// Read all files in the directory
		const files = fs.readdirSync(dirPath)

		files.forEach((file) => {
			const fullPath = path.join(dirPath, file)

			// If it's a directory, recursively process it
			if (fs.statSync(fullPath).isDirectory()) {
				processMarkdownFilesInDirectory(fullPath)
			}
			// If it's a markdown file, process it
			else if (fullPath.endsWith('.md')) {
				normalizeMarkdownFile(fullPath)
			}
		})
	}
	catch (err) {
		console.error(`Error processing directory: ${dirPath}`, err)
	}
}

// Get the directory path from the command line arguments (or use the current directory)
const dirPath = process.argv[2] || '.' // Default to the current directory

if (dirPath) {
	processMarkdownFilesInDirectory(dirPath)
}
else {
	console.error('Please provide a valid directory path.')
}
