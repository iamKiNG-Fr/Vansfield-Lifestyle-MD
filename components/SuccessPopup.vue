<template>
    <div class="teal-shadow bg-white px-16 py-5 flex flex-col rounded-lg absolute top-5 left-1/2 -translate-x-1/2 mx-auto z-20">
        <img src="/success.gif" alt="success" class="-mt-10">
        <p class="-mt-8 mb-3">"{{productName}}" successfully added</p>
        <button class="btn2">View Details</button>
    </div>
</template>

<script setup>
const {productName} = defineProps(['productName'])
</script>

<style scoped>
    .teal-shadow{
        box-shadow: 10px 10px 0px 0px #008080;
    }
</style>