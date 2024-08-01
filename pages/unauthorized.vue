<template>
    <div class="mt-7 max-w-sm mx-auto text-center card">
        <p class="mt-7 text-4xl font-bold text-teal-700">unauthorized</p>
        <p class=" text-2xl">Ooops.</p>
        <p class="mb-9">You do not have permission to view this page.</p>
        <NuxtLink class="mt-7 underline italic  font-semibold text-teal-700 hover:text-teal-400" to="/">Go back to home</NuxtLink>
    </div>
</template>

<script setup>
    defineProps(['error'])

    const handleClearError = () => clearError({redirect: '/'})
</script>

<style scoped>

</style>