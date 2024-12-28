import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// TODO: make line number in console.log point towards the exact line in vscode

// ANSI escape codes for colors
const RED = '\x1B[31m'
const GREEN = '\x1B[32m'
const GREY = '\x1B[90m'
const RESET = '\x1B[0m' // Resets color

// Function to normalize the markdown image links with line numbers
export function normalizeImagePathInMarkdown(markdown, filePath) {
	// Regex to match markdown image links: ![alt text](url)
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g

	let isFilePathLogged = false // Flag to check if file path has been logged

	// Only log if not in a test environment
	const isTestEnvironment = process.env.NODE_ENV === 'test'

	let lineNumber = 0 // Track line number

	// Replace the links with normalized paths, line by line
	return markdown.split('\n').map((line) => {
		lineNumber++

		// Use regex to find all image URLs in the line
		return line.replace(regex, (match, altText, url) => {
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

			// Log the original and updated URLs with more descriptive text
			if (!isTestEnvironment) {
				// Log only if the URL has changed and the file path hasn't been logged yet
				if (originalUrl !== url) {
					/* eslint-disable no-console */
					if (!isFilePathLogged) {
						// Log the file path only once
						console.log(`${filePath}`)
						isFilePathLogged = true
					}

					// Calculate the padding for alignment
					const lineNumPadding = `${GREY}${(lineNumber + 1).toString().padEnd(6)}${RESET}` // Padding for line number

					// Adjust the padding for "Original" and "Updated" texts
					const originalText = `Original: ${RED}${originalUrl}${RESET}`.padEnd(50) // Adjust this length for alignment
					const updatedText = `Updated: ${GREEN}${url}${RESET}`.padEnd(50) // Adjust this length for alignment

					// Print the aligned output
					console.log(`${lineNumPadding}${originalText}`)
					console.log(`${' '.padEnd(6)}${updatedText}`) // Align updated line under the original one
					console.log('') // Add a blank line for spacing
				}
			}

			// Return the updated markdown with the modified path
			return `![${altText}](${url})`
		})
	}).join('\n') // Recombine the lines back into a single string
}

// Function to normalize a single markdown file
export function NormalizeImagePathInMarkdownFile(filePath) {
	try {
		const markdown = fs.readFileSync(filePath, 'utf8')
		const normalizedMarkdown = normalizeImagePathInMarkdown(markdown, filePath) // Pass filePath here

		// If the content is different, write it back and log the change
		if (markdown !== normalizedMarkdown) {
			fs.writeFileSync(filePath, normalizedMarkdown, 'utf8')
			console.log(`${GREEN}File ${filePath} has been normalized${RESET}`)
		}
	}
	catch (err) {
		console.error(`Error processing file: ${filePath}`, err)
	}
}

// Function to normalize all markdown files in a directory (recursively)
export function NormalizeImagePathInMarkdownsDirectory(dirPath) {
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
