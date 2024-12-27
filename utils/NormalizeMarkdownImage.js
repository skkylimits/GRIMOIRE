import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Function to normalize the markdown image links
export function normalizeMarkdownImageLinks(markdown) {
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
