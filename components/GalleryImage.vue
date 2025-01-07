<template>
  <div class="relative overflow-hidden group">
    <!-- Background Image -->
    <div
      :style="{ backgroundImage: `url('${backend + image.image}')` }"
      class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
    ></div>

    <!-- Content Overlay -->
    <div
      class="relative z-10 flex flex-col h-full justify-end bg-gradient-to-t from-gray-800  from-5% to-transparent to-80% transition-all translate-y-6 group-hover:translate-y-0 duration-500"
    >
      <p class="text-gray-100 font-bold text-lg mx-4 my-2">{{ image.title }}</p>
      <div
        id="location-tag"
        class="bg-yellow-400 text-gray-900 font-bold uppercase w-fit mx-4 py-1 px-3 rounded-full text-xs"
      >
        {{ image.location }}
      </div>
      <!-- View More Box -->
      <div
        class="mt-4 w-full bg-teal-700 text-white text-center py-2 font-bold opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
      >
        View More
      </div>
    </div>
  </div>
</template>

<script setup>
const backend = useRuntimeConfig().public.backendUrl;
const { image } = defineProps(["image"]);

</script>
