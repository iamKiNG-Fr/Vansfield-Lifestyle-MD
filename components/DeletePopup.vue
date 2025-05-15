<template>
  <div
    class="w-screen backdrop-blur-sm bg-gray-800 bg-opacity-10 inset-0 h-screen fixed flex justify-center items-center z-30"
  >
    <div
      class="delete-card bg-white p-6 flex flex-col gap-3 rounded-lg  mx-auto z-20"
    >
      <p class="text-2xl font-bold">Delete Product</p>
      <p>Are you sure you want to delete "{{ productName }}"?</p>
      <div class="flex gap-3">
        <button
          class="bg-red-700 text-white p-1 flex-1 rounded-md hover:bg-red-500 transition-colors duration-300"
          @click="$emit('deleteProduct', id), isDeleting=true" :disabled="isDeleting" :class="{'cursor-not-allowed bg-red-400':isDeleting}"
        >
          Yes, Delete
        </button>
        <button
          class="text-teal-700 flex-1 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-300"
          @click="$emit('removeDeletePopup')"
        >
          Keep It!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { productName, id, isDeleting } = defineProps(["productName", "id", "isDeleting"]);

</script>

<style scoped>
.delete-card {
  box-shadow: 10px 10px 0px 0px #008080;
}
</style>
