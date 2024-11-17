<template>
    <Alert 
        icon="i-material-symbols:warning" 
        title="Warning"
        iconColor="text-orange-400 dark:text-orange-700"
        class="bg-orange-200 dark:bg-orange-500 text-black dark:text-white border-2 border-orange-400 dark:border-orange-700"
    >
        <slot />
    </Alert>
</template>