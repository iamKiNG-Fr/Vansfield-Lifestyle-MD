<template>
  <section class="overflow-x-clip overflow-y-hidden bg-white py-12 lg:py-16">
    <div class="mx-auto max-w-7xl px-4 lg:px-20">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Gallery Highlights</p>
          <h3 class="mt-3 text-3xl font-bold text-gray-900 lg:text-4xl">
            Moments from consultations, speaking, and community impact
          </h3>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-[32px] border border-stone-200 bg-stone-100 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div class="carousel-track">
          <article
            v-for="(item, index) in carouselItems"
            :key="`${item}-${index}`"
            class="carousel-card"
          >
            <img
              :src="item"
              alt="Gallery highlight"
              class="h-72 w-full rounded-[24px] object-cover lg:h-80"
              draggable="false"
              loading="lazy"
            />
          </article>
        </div>
      </div>
    </div>
  </section>
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
];
const carouselItems = [...items, ...items];
</script>

<style scoped>
.carousel-track {
  display: flex;
  gap: 1rem;
  width: fit-content;
  min-width: 100%;
  animation: marquee 45s linear infinite;
  will-change: transform;
}

.carousel-card {
  width: clamp(220px, 68vw, 320px);
  flex: 0 0 auto;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@media (min-width: 1024px) {
  .carousel-card {
    width: 280px;
  }
}

@media (max-width: 639px) {
  .carousel-card {
    width: 240px;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 0.5rem));
  }
}
</style>
