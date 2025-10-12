import { describe, expect, it } from 'vitest'
import { updateAssetMetadataInMarkdown } from '../../../scripts/markdown/UpdateAltText'

describe('updateAltTextInMarkdown', () => {
	it('should update alt text to filename without extension', () => {
		const input = '![This is an image](public/images/example-image.png)'
		const output = '![example-image](public/images/example-image.png)'

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	it('should handle empty alt text gracefully', () => {
		const input = '![](public/images/example-image.png)'
		const output = '![example-image](public/images/example-image.png)' // No alt text should be updated

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	it('should handle images with special characters in filename', () => {
		const input = '![Special Character Image](public/images/example-image-#1.png)'
		const output = '![example-image-#1](public/images/example-image-#1.png)'

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	// reconsider if we trim spaces and what function should do that
	// it('should handle image links with additional spaces or characters', () => {
	// 	const input = '![This is an image ]( public/images/example-image.png )'
	// 	const output = '![example-image](public/images/example-image.png)' // Trim spaces

	// 	expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	// })

	it('should handle malformed markdown gracefully (no alt or path)', () => {
		const input = '![Malformed markdown]'
		const output = '![Malformed markdown]' // No valid image path

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	it('should handle relative paths starting with ../', () => {
		const input = '![Relative Image](../images/example-image.png)'
		const output = '![example-image](../images/example-image.png)' // Filename without change

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	it('should update multiple images in a single markdown block', () => {
		const input = '![First Image](public/images/first-image.png)\n![Second Image](public/images/second-image.png)'
		const output = '![first-image](public/images/first-image.png)\n![second-image](public/images/second-image.png)'

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})

	it('should ignore non-image markdown content', () => {
		const input = '[Some link](http://example.com)'
		const output = '[Some link](http://example.com)' // No change

		expect(updateAssetMetadataInMarkdown(input)).toBe(output)
	})
})
