<template>
    <div class="block pl-4 pr-6 pt-6 edge box-shadow">
        <div class="alert-title">
            <span class="i-ph:lightbulb mr-2" aria-hidden="true">i-ph:lightbulb</span>
            <p>Alert</p>
        </div>
        <div class="alert-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.alert-title p {
    display: inline; /* Make any <p> inline to prevent new lines caused by MDC syntax*/
    margin: 0; /* Remove any margin that might push it down */
    padding: 0; /* Remove any padding that could affect alignment */
}
</style>