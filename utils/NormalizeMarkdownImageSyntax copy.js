import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Function to normalize the markdown image links
export function normalizeImagePathInMarkdown(markdown) {
	// ANSI escape codes for colors
	const RED = '\x1B[31m'
	const GREEN = '\x1B[32m'
	const RESET = '\x1B[0m' // Resets color

	// Split the markdown content into lines
	const lines = markdown.split('\n')

	// Store the result with normalized URLs
	let normalizedMarkdown = ''

	// Process each line, keeping track of line numbers
	lines.forEach((line, lineNumber) => {
		// Regex to match markdown image links: ![alt text](url)
		const regex = /!\[([^\]]*)\]\(([^)]+)\)/g

		// Replace the links with normalized paths
		const updatedLine = line.replace(regex, (match, altText, url) => {
			// Store the original URL
			const originalUrl = url

			// Edge case: If URL contains 'https://', 'http://', or any full URL, don't modify
			if (url.startsWith('http://') || url.startsWith('https://')) {
				return `![${altText}](${url})` // Return unchanged URL
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

			// Log only if the URL has changed
			if (originalUrl !== url) {
				/* eslint-disable no-console */
				console.log(`${RED}Line ${lineNumber + 1}:${RESET}`)
				console.log(`${RED}Original:${RESET} ${RED}${originalUrl}${RESET}`)
				console.log(`${GREEN}Updated:${RESET} ${GREEN}${url}${RESET}`)
				console.log('') // Add a blank line for spacing
			}

			// Return the updated markdown with the modified path
			return `![${altText}](${url})`
		})

		// Add the updated line to the final markdown result
		normalizedMarkdown += `${updatedLine}\n`
	})

	// Return the updated markdown with all modifications
	return normalizedMarkdown
}

// Function to normalize a single markdown file
export function NormalizeImagePathInMarkdownFile(filePath) {
	try {
		const markdown = fs.readFileSync(filePath, 'utf8')
		const normalizedMarkdown = normalizeImagePathInMarkdown(markdown)

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
export function NormalizeImagePathInMarkdownsDirectory(dirPath) {
	try {
		const files = fs.readdirSync(dirPath)

		files.forEach((file) => {
			const fullPath = path.join(dirPath, file)

			if (fs.statSync(fullPath).isDirectory()) {
				// Recursively process directories
				NormalizeImagePathInMarkdownsDirectory(fullPath)
			}
			else if (fullPath.endsWith('.md')) {
				NormalizeImagePathInMarkdownFile(fullPath)
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
			NormalizeImagePathInMarkdownsDirectory(inputPath)
		}
		else if (stat.isFile() && inputPath.endsWith('.md')) {
			NormalizeImagePathInMarkdownFile(inputPath)
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
