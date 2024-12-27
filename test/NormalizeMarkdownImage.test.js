import { describe, expect, it } from 'vitest'
import { normalizeMarkdownImageLinks } from '../utils/NormalizeMarkdownImage'

// Test cases for normalizeMarkdownImageLinks
describe('normalizeMarkdownImageLinks', () => {
	// Basic cases
	it('case 1: handles root level paths with public/', () => {
		const input = '![alt text](public/auto-imgager.png)'
		const output = '![alt text](/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 2: handles one level deep paths with ../public/', () => {
		const input = '![alt text](../public/content/auto-imgager.png)'
		const output = '![alt text](/content/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 3: handles nested paths with multiple levels', () => {
		const input
			= '![alt text](../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		const output
			= '![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 4: removes ../public prefix', () => {
		const input = '![example](../../public/content/test.png)'
		const output = '![example](/content/test.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 5: prepends slash for filenames without path', () => {
		const input = '![example](test.png)'
		const output = '![example](/test.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 6: normalizes excessive slashes to a single slash', () => {
		const input
			= '![alt text](////content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		const output
			= '![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('case 7: handles nested paths with public/ and excess slashes', () => {
		const input
			= '![alt text](/../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		const output
			= '![alt text](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	// Edge cases
	it('edge #1 does not replace URLs with ../public', () => {
		const input = '![example](https://example.com/../public/content/logo.png)'
		const output = '![example](https://example.com/../public/content/logo.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #2 ignores plain text containing ../public', () => {
		const input = 'This is text with ../public in it.'
		const output = 'This is text with ../public in it.'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #3 does not replace markdown links with ../public prefix', () => {
		const input = '[example](../../public/content/logo.png)'
		const output = '[example](../../public/content/logo.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #4 ignores file paths with spaces', () => {
		const input = 'This is a path: ../../public/content/My Image.png'
		const output = 'This is a path: ../../public/content/My Image.png'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #5 does not replace ../public in code blocks', () => {
		const input = '```bash\necho ../../public/content/logo.png\n```'
		const output = '```bash\necho ../../public/content/logo.png\n```'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #6 does not replace absolute paths with file://', () => {
		const input = 'file:///../../public/content/logo.png'
		const output = 'file:///../../public/content/logo.png'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #7 handles multiple ../public in complex paths', () => {
		const input
			= '![example](../../../../public/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		const output
			= '![example](/content/6.knowledge-base/6.operating-systems/1.windows-forensics/auto-imgager.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})

	it('edge #8 handles paths in list items', () => {
		const input
			= '- ![example](../../../../public/content/logo.png)'
		const output
			= '- ![example](/content/logo.png)'
		expect(normalizeMarkdownImageLinks(input)).toBe(output)
	})
})
