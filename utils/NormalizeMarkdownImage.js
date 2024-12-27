import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Function to normalize the markdown image links
export function normalizeMarkdownImageLinks(markdown) {
	// Regex to match markdown image links: ![alt text](url)
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g

	// Replace the links with normalized paths
	return markdown.replace(regex, (match, altText, url) => {
		// Check if the URL contains 'public' and adjust
		if (url.includes('public')) {
			// Use regex to remove any ../../public from the start of the URL
			url = url.replace(/(\.\.\/)+public/, '/') // Replace multiple ../public with a single slash

			// If 'public' is directly at the start, remove it
			if (url.startsWith('public/')) {
				url = url.substring(7) // Remove 'public/' from the start
			}
		}

		// Remove any excess slashes (e.g., //// to /)
		url = url.replace(/\/+/g, '/') // Replace multiple slashes with a single slash

		// If the URL is a simple file name (no slashes), prepend a slash
		if (!url.startsWith('/') && !url.includes('/')) {
			url = `/${url}`
		}

		// Return the updated markdown with the modified path
		return `![${altText}](${url})`
	})
}

// Function to normalize a single markdown file
export function normalizeMarkdownFile(filePath) {
	try {
		const markdown = fs.readFileSync(filePath, 'utf8')
		const normalizedMarkdown = normalizeMarkdownImageLinks(markdown)

		// If the content is different, write it back and log the change
		if (markdown !== normalizedMarkdown) {
			fs.writeFileSync(filePath, normalizedMarkdown, 'utf8')
			console.log(`File ${filePath} has been normalized`)
		}
	}
	catch (err) {
		console.error(`Error processing file: ${filePath}`, err)
	}
}

// Function to normalize all markdown files in a directory (recursively)
export function normalizeMarkdownFilesInDirectory(dirPath) {
	try {
		const files = fs.readdirSync(dirPath)

		files.forEach((file) => {
			const fullPath = path.join(dirPath, file)

			if (fs.statSync(fullPath).isDirectory()) {
				// Recursively process directories
				normalizeMarkdownFilesInDirectory(fullPath)
			}
			else if (fullPath.endsWith('.md')) {
				normalizeMarkdownFile(fullPath)
			}
		})
	}
	catch (err) {
		console.error(`Error processing directory: ${dirPath}`, err)
	}
}

// Main function for CLI usage
function main() {
	const inputPath = process.argv[2]

	if (inputPath) {
		const stat = fs.statSync(inputPath)

		if (stat.isDirectory()) {
			normalizeMarkdownFilesInDirectory(inputPath)
		}
		else if (stat.isFile() && inputPath.endsWith('.md')) {
			normalizeMarkdownFile(inputPath)
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
