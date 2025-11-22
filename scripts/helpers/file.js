import fs from 'node:fs'
import path from 'node:path'

/**
 * 📖 Lees veilig een JSON-bestand.
 * Retourneert {} of [] als het niet bestaat of ongeldig is.
 */
export function readJsonSafe(filePath, fallback = {}) {
	try {
		if (!fs.existsSync(filePath))
			return fallback
		const data = fs.readFileSync(filePath, 'utf8')
		return JSON.parse(data)
	}
	catch (err) {
		console.warn(`⚠️ Kon JSON niet lezen: ${filePath} → reset naar fallback`, err.message)
		return fallback
	}
}

/**
 * 💾 Schrijf JSON-data naar een bestand met automatische mapaanmaak.
 */
export function writeJson(filePath, data) {
	try {
		// Zorg dat de map bestaat
		const dir = path.dirname(filePath)
		fs.mkdirSync(dir, { recursive: true })

		// Schrijf bestand met nette indentatie
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
		console.log(`💾 Metrics opgeslagen → ${filePath}`)
	}
	catch (err) {
		console.error(`❌ Fout bij schrijven naar ${filePath}:`, err.message)
	}
}

/**
 * 🧹 Verwijder een bestand als het bestaat.
 */
export function removeFile(filePath) {
	try {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
			console.log(`🗑️ Verwijderd → ${filePath}`)
		}
	}
	catch (err) {
		console.error(`❌ Kon bestand niet verwijderen: ${filePath}`, err.message)
	}
}

/**
 * 📂 Controleer of een bestand bestaat.
 */
export function fileExists(filePath) {
	return fs.existsSync(filePath)
}
