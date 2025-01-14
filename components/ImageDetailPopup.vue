<template>
  <div
    class="w-full backdrop-blur-sm top-0 h-screen fixed flex justify-center items-center z-30"
  >
    <div
      class="flex gap-2 max-md:flex-col mx-7 bg-gray-100 w-[1000px] h-[500px] rounded-xl overflow-hidden shadow-xl relative"
    >
    <UIcon
      name="material-symbols:close-rounded"
      class="text-3xl hover:text-red-400 z-40 drop-shadow-md self-end absolute top-4 right-4 hidden md:block"
      @click="$emit('closeImageDetail')"
      dynamic
    />
      <div
        id="imge"
        :style="{
          backgroundImage: `url('${backend + popupImageDetail.image}')`,
        }"
        class="overflow-hidden bg-cover relative flex-1 transition-transform duration-500 hover:scale-110"
      >
      </div>
      <div class="relative flex-1 p-8 flex flex-col gap-3 overflow-auto">
        <h3 class="font-bold text-3xl">{{ popupImageDetail.title }}</h3>
        <p
          class="bg-yellow-400 text-gray-900 font-bold uppercase w-fit py-1 px-3 rounded-full text-xs"
        >
          {{ popupImageDetail.location }}
        </p>
        <p class="">{{ popupImageDetail.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const backend = useRuntimeConfig().public.backendUrl;
const { popupImageDetail } = defineProps(["popupImageDetail"]);
</script>

<style scoped>

</style>
