<template>
    <div class="block my-5 px-4 pt-6 border rounded-md box-shadow">
        <div class="alert-title flex items-center">
            <UIcon :name="icon" class="mr-2" />
            <p class="font-bold">{{ title }}</p>
        </div>
        <div class="alert-content">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: 'i-mdi:highlighter', // Default icon for the base alert
    },
    title: {
        type: String,
        default: 'Alert' // Default title for the base alert
    }
});
</script>

<style scoped>
.alert-title p {
    margin: 0; /* Remove any margin that might push it down */
    padding: 0; /* Remove any padding that could affect alignment */
}
</style>
