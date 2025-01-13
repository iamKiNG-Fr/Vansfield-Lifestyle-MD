<template>
  <div
    class="w-full backdrop-blur-sm top-0 h-screen fixed z-30 flex justify-center items-center"
  >
    <div
      class="flex max-md:flex-col mx-7 bg-gray-100 max-w-[1000px] h-[500px] rounded-xl overflow-hidden shadow-xl relative"
    >
      <div
        id="imge"
        :style="{
          backgroundImage: `url('${backend + popupImageDetail.image}')`,
        }"
        class="bg-cover flex-1 transition-transform duration-500 hover:scale-110 z-10"
      >
      </div>
      <div class="flex-1 p-8 flex flex-col gap-3 overflow-auto">
        <UIcon
          name="material-symbols:close-rounded"
          class="text-3xl hover:text-red-400 drop-shadow-md self-end z-20 absolute top-4 right-4 hidden md:block"
          @click="$emit('closeImageDetail')"
          dynamic
        />
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

<style lang="scss" scoped></style>
