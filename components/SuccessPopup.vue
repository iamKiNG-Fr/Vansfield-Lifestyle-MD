<template>
    <div class="w-screen backdrop-blur-sm bg-gray-800 bg-opacity-10 inset-0 h-screen fixed flex justify-center items-center z-30">
        <div class="teal-shadow bg-white px-16 py-5 flex flex-col items-center rounded-lg z-20">
            <img src="/success.gif" alt="success" class="-mt-10 w-[200px]">
            <p class="-mt-8 mb-3 font-bold">{{message}}</p>
            <!-- <button class="btn2">View Details</button> -->
        </div>
    </div>
</template>

<script setup>
const {message} = defineProps(['message'])
</script>

<style scoped>
    .teal-shadow{
        box-shadow: 10px 10px 0px 0px #008080;
    }
</style>