<script setup>
// Reactive variable to store the current theme
const theme = ref('')

// Function to update the theme variable based on <html> element's class
function updateTheme() {
	const htmlElement = document.documentElement
	theme.value = htmlElement.classList.contains('dark') ? 'dark' : 'light'
}

// Set up MutationObserver to watch for class changes
onMounted(() => {
	updateTheme() // Initialize the theme

	const observer = new MutationObserver(() => updateTheme())
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

// Compute iframe source URL based on the current theme
const iframeSrc = computed(() => {
	return `https://volta.net/embed/eyJ2aWV3IjoiYm9hcmQiLCJib2FyZFN0YXR1c2VzIjpbInRyaWFnZSIsImJhY2tsb2ciLCJ0b2RvIiwiaW5fcHJvZ3Jlc3MiLCJpbl9yZXZpZXciLCJkb25lIiwicmVsZWFzZWQiLCJjYW5jZWxsZWQiXSwiYm9hcmRMaW5rZWRQcnMiOnRydWUsImxpc3RHcm91cCI6InN0YXR1cyIsImxpc3RPcmRlciI6ImNyZWF0ZWRfYXQiLCJ0aW1lbGluZVpvb20iOiJtb250aCIsInRpbWVsaW5lT3JkZXIiOiJzdGF0ZSIsInRpbWVsaW5lRGlzcGxheSI6ImFsbF9taWxlc3RvbmVzIiwiZmlsdGVycyI6e30sIm93bmVyIjoic2treWxpbWl0cyIsIm5hbWUiOiJOYW1lbGVzcyJ9?theme=${theme.value}`
})
</script>

<template>
	<div>
		<!-- Volta board iframe -->
		<div class="volta-board-container">
			<iframe
				:src="iframeSrc"
				width="100%"
				height="100%"
				frameborder="0"
			/>
		</div>
	</div>
</template>

<style scoped>
.volta-board-container {
	height: calc(100vh - 64px); /* Subtract the header height (64px) from the viewport height */
	display: flex;
	justify-content: center;
	align-items: center;
}

iframe {
	width: 100%;
	height: 100%; /* Take the full height of the adjusted container */
	border: none; /* Remove iframe borders */
}
</style>
