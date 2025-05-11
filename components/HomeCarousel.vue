<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{
      item: 'basis-full md:basis-1/2 lg:basis-1/4',
      active: 'bg-yellow-400',
    }"
    class="overflow-hidden"
  >
    <img :src="item" class="h-96 w-full object-cover" draggable="false" />
  </UCarousel>
</template>

<script setup>
const items = [
  "/dr_dozie/1.jpg",
  "/dr_dozie/2.jpg",
  "/dr_dozie/7.jpg",
  "/dr_dozie/8.jpg",
  "/dr_dozie/9.jpg",
  "/dr_dozie/11.jpg",
  "/dr_dozie/14.jpg",
  "/dr_dozie/15.jpg",
  "/dr_dozie/IMG-20250504-WA0032.jpg",
  "/dr_dozie/IMG-20250504-WA0039.jpg",
  "/dr_dozie/IMG-20250504-WA0040.jpg",
  "/dr_dozie/IMG-20250504-WA0041.jpg",
  "/dr_dozie/IMG-20250504-WA0042.jpg",
  "/dr_dozie/IMG-20250504-WA0043.jpg",
  "/dr_dozie/IMG-20250504-WA0044.jpg",
  "/dr_dozie/IMG-20250504-WA0045.jpg",
  "/dr_dozie/IMG-20250504-WA0046.jpg",
  "/dr_dozie/IMG-20250504-WA0047.jpg",
  "/dr_dozie/IMG-20250504-WA0048.jpg",
  "/dr_dozie/IMG-20250504-WA0049.jpg",
  "/dr_dozie/IMG-20250504-WA0062.jpg",
  "/dr_dozie/IMG-20250504-WA0064.jpg",
  "/dr_dozie/IMG-20250504-WA0065.jpg",
  "/dr_dozie/IMG-20250504-WA0066.jpg",
  "/dr_dozie/IMG-20250504-WA0067.jpg",
  "/dr_dozie/IMG-20250504-WA0068.jpg",
  "/dr_dozie/IMG-20250504-WA0069.jpg",
  "/dr_dozie/IMG-20250504-WA0070.jpg",
  "/dr_dozie/IMG-20250504-WA0071.jpg",
  "/dr_dozie/IMG-20250504-WA0072.jpg",
  "/dr_dozie/WhatsApp Image 2024-09-26 at 14.47.27_9dcd3740.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.25_f4afa93d.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.27_7d37db96.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.29_eea06644.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.30_73bfe220.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.31_a935fe86.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.31_ef8287fd.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.47.32_e861091a.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.27_b7dbf713.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.27_feb6c2a3.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.28_5e79faf9.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.28_683eb6af.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.28_e0747755.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.29_b5146f96.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.29_c81ad519.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.30_7379f933.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.30_f8776c9d.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.31_b08d4351.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.32_2bde9a8e.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.32_9a527fbf.jpg",
  "/dr_dozie/WhatsApp Image 2025-05-04 at 17.52.33_cb67dd7d.jpg",
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 4000);
});
</script>
