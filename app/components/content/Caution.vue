<template>
    <Alert class="bg-black" icon="icon-park-solid:caution" title="Caution">
        <slot />
    </Alert>
</template>

<script setup>
import Alert from './Alert.vue';
</script>