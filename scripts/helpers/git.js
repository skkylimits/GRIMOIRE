import { execSync } from 'node:child_process'

export function getGitCommit() {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim()
	}
	catch {
		return 'unknown'
	}
}

export function getGitBranch() {
	try {
		return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
	}
	catch {
		return 'unknown'
	}
}
