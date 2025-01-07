<template>
  <div
    class="h-[400px] bg-gradient-to-r from-teal-900 to-teal-600 rounded-2xl flex bg-no-repeat bg-right-top overflow-hidden"
  >
    <ClientOnly>
      <swiper-container
        :slides-per-view="1"
        :autoplay-delay="8000"
        class="w-full"
      >
        <swiper-slide
          class="flex h-full"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <!-- {{ slide }} -->
          <div
            id="content"
            class="text-gray-100 hidden md:block flex-col gap-2 flex-1 self-end p-12"
          >
            <h2 class="font-bold text-4xl">{{ slide.title }}</h2>
            <div
              id="location-tag"
              class="bg-yellow-400 text-gray-800 font-bold uppercase w-fit py-1 px-3 rounded-full text-xs"
            >
              {{ slide.location }}
            </div>
            <p id="description" class="text-sm">
              {{ slide.description }}
            </p>
          </div>
          <div
            :style="{ backgroundImage: `url('${backend + slide.image}')` }"
            class="bg-cover max-md:animate-scrollsm md:animate-scroll flex-1 h-full"
          >
            <div
              class="md:hidden flex items-end h-full p-10 bg-gradient-to-t from-gray-800 from-5% to-transparent to-50%"
            >
              <div class="flex flex-col gap-2">
                <h2 class="font-bold text-4xl text-gray-50">
                  {{ slide.title }}
                </h2>
                <div
                  id="location-tag"
                  class="bg-yellow-400 text-gray-800 font-bold uppercase w-fit py-1 px-3 rounded-full text-xs"
                >
                  {{ slide.location }}
                </div>
                <p id="description" class="text-sm font-normal text-gray-50">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
    <!-- Go back one slide -->
    <button @click="swiper.prev()">Prev</button>
    <!-- Go forward one slide -->
    <button @click="swiper.next()">Next</button>
  </div>
</template>

<script setup>
const backend = useRuntimeConfig().public.backendUrl;

const { carouselItems } = defineProps(["carouselItems"]);

const containerRef = ref(null);
const slides = ref(carouselItems);
const swiper = useSwiper(containerRef);

onMounted(() => {
  // Access Swiper instance
  // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties
});
</script>

<style>
@keyframes scroll {
  0% {
    background-position: 0 0; /* Start at top */
  }
  50% {
    background-position: 0 100%; /* Go to bottom */
  }
  100% {
    background-position: 0 0; /* Return to top */
  }
}
@keyframes scrollsm {
  0% {
    background-position: 0 0; /* Start at top */
  }
  50% {
    background-position: 0 20%; /* Go to bottom */
  }
  100% {
    background-position: 0 0; /* Return to top */
  }
}

.animate-scroll {
  animation: scroll 10s linear infinite;
}
.animate-scrollsm {
  animation: scrollsm 10s linear infinite;
}
</style>
