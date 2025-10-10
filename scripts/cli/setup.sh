#!/usr/bin/env bash
# ┌──────────────────────────────────────────────┐
# │ 💻 VS Code Setup Script                      │
# └──────────────────────────────────────────────┘
# Installeert automatisch alle extensies
# die in .vscode/extensions.json worden aanbevolen.

set -e

echo "🚀 VS Code extensies installeren..."

# Controleren of 'code' beschikbaar is
if ! command -v code &> /dev/null; then
  echo "❌ VS Code CLI (code) is niet gevonden."
  echo "👉 Open VS Code en voer uit: 'Shell Command: Install code command in PATH'"
  exit 1
fi

# Check of het bestand bestaat
if [ ! -f ".vscode/extensions.json" ]; then
  echo "❌ Geen .vscode/extensions.json bestand gevonden in deze directory."
  exit 1
fi

# Extensies uitlezen en installeren
grep -oE '"[a-zA-Z0-9._-]+/[a-zA-Z0-9._-]+"' .vscode/extensions.json \
  | tr -d '"' \
  | while read -r extension; do
      if code --list-extensions | grep -q "$extension"; then
        echo "✅ Al geïnstalleerd: $extension"
      else
        echo "📦 Installeer: $extension"
        code --install-extension "$extension"
      fi
    done

echo "✨ Klaar! Alle aanbevolen extensies zijn nu geïnstalleerd."
