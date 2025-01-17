<template>
  <div class="relative">
    <ImageDetailPopup v-if="showImageDetail" :popupImageDetail="popupImageDetail" @closeImageDetail="showImageDetail =! showImageDetail" />
    <main class="mx-auto w-5/6 flex flex-col gap-5">
      <section id="gallery-slider">
        <div v-if="carouselItems.length === 0" class="text-center"><UIcon name="svg-spinners:12-dots-scale-rotate" class=" text-teal-800 text-4xl" dynamic /></div>
        <div v-else>
          <GallerySlider :carouselItems="carouselItems" />
        </div>
      </section>
      <section id="top-pictures" class="mb-10">
        <h3 class="font-bold text-3xl">+ Top Moments</h3>
        <p class="italic">Note worthy moments</p>
        <div>
          <div v-if="gallery.length === 0" class="text-center"><UIcon name="svg-spinners:12-dots-scale-rotate" class=" text-teal-800 text-4xl" dynamic /></div>
          <div v-else class="md:gap-8 gap-4 mt-8 md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] grid grid-cols-2">
            <GalleryImage v-for="(image, index) in gallery" :key="index" class="bg-gray-200 md:h-72 md:w-52 h-52  rounded-md shadow-lg" :image="image" @click="showImageDetail =! showImageDetail; popupImageDetail = image" />
          </div>
        </div>
      </section>
    </main>
    <Newsletter />
  </div>
</template>

<script setup>


const backend = useRuntimeConfig().public.backendUrl;
const { token } = useAuthState();

useHead({
  title: "Vansfield Lifestyle MD | Gallery",
  meta: [{ name: "description", content: "Discover the inspiring work of Dr. Dozie through a collection of images showcasing her dedication to improving health and well-being in communities across Nigeria and the World.." }],
});

defineOgImageComponent('NuxtSeo'
, {
  colorMode: 'dark',
  theme: '#008080',
  sitelogo: '/favicon.ico'
}
)
definePageMeta({
  auth: false,
});

const gallery = ref([]);
const carouselItems = ref([]);
const showImageDetail = ref(false)
const popupImageDetail = ref()

const fetchGallery = async () => {
  try {
    const data = await $fetch(`${backend}/gallery`, {
      method: "get",
      headers: token.value ? { Authorization: token.value } : {},
    });
    gallery.value = data;

    // Extract objects where iscarousel is true
    carouselItems.value = data.filter((item) => item.isCarousel === true);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchGallery();
});
</script>
