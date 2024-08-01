<template>
    <div class="delete-card bg-white p-6 flex flex-col gap-3 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 mx-auto z-20">
        <p class="text-2xl font-bold">Delete Product</p>
        <p>Are you sure you want to delete "{{productName}}"?</p>
        <div class="flex gap-3">
            <button class="bg-red-700 text-white p-1 flex-1 rounded-md hover:bg-red-500 transition-colors duration-300" @click="$emit('deleteProduct',id)">Yes, Delete</button>
            <button class="text-teal-700 flex-1 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-300" @click="$emit('removeDeletePopup')">Keep It!</button>
        </div>
    </div>
</template>

<script setup>
    const {productName, id} = defineProps(['productName', 'id'])
</script>

<style scoped>
    .delete-card{
        box-shadow: 10px 10px 0px 0px #008080;
    }
</style>