/**
 * 🕒 Bereken veilig het verschil tussen twee tijdstempels (ms → s)
 * Retourneert 0 als een van beide waarden ontbreekt.
 */
export function diff(a, b) {
  return a && b ? Math.max((a - b) / 1000, 0) : 0
}

/**
 * ⏱️ Format een tijd in seconden met 3 decimalen
 * (handig voor consistente console-output)
 */
export function formatSeconds(value) {
  return (value ?? 0).toFixed(3) + 's'
}
