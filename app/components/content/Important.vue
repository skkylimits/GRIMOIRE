<template>
    <Alert 
        icon="i-bxs:message-error" 
        title="Important" 
        iconColor="text-purple-400 dark:text-purple-700"
        class="bg-purple-200 dark:bg-purple-400 text-black dark:text-white border-2 border-purple-400 dark:border-purple-700"
    >
        <slot />
    </Alert>
</template>