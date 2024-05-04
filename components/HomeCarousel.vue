<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/4', active: 'bg-yellow-400'}"
    class="overflow-hidden"
    indicators
  >
    <img :src="item" class="h-96 w-full object-cover" draggable="false">
  </UCarousel>
</template>

<script setup>
const items = [
  '/dr_dozie/1.jpg',
  '/dr_dozie/2.jpg',
  '/dr_dozie/4.jpg', 
  '/dr_dozie/7.jpg',
  '/dr_dozie/8.jpg',
  '/dr_dozie/9.jpg',
  '/dr_dozie/10.jpg',
  '/dr_dozie/11.jpg',
  '/dr_dozie/12.jpg',
  '/dr_dozie/14.jpg',
  '/dr_dozie/15.jpg'
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 4000)
})
</script>

