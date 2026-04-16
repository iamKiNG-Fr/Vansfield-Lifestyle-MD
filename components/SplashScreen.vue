<template>
  <transition name="fade" @after-leave="onSplashComplete">
    <div
      v-if="isVisible"
      id="splash-screen"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#fef3c7_0%,#f8fafc_34%,#ccfbf1_100%)]"
    >
      <div class="absolute left-12 top-12 h-40 w-40 rounded-full bg-yellow-300/30 blur-3xl"></div>
      <div class="absolute bottom-12 right-12 h-48 w-48 rounded-full bg-teal-300/30 blur-3xl"></div>

      <div class="relative flex flex-col items-center px-6 text-center">
        <div class="splash-ring">
          <img
            src="/assets/img/vansfield-logo.png"
            alt="Vansfield Lifestyle MD logo"
            class="h-20 w-20 rounded-full bg-white object-contain shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
          />
        </div>
        <p class="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
          Vansfield Lifestyle MD
        </p>
        <p class="mt-3 max-w-md text-3xl font-bold text-gray-900 md:text-4xl">
          Preparing a calmer wellness experience.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useSplash } from "../composables/useSplash";

const { isVisible, setSplashComplete } = useSplash();

function onSplashComplete() {
  setSplashComplete();
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.splash-ring {
  position: relative;
  display: grid;
  place-items: center;
  width: 7.5rem;
  height: 7.5rem;
}

.splash-ring::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 3px solid rgba(15, 118, 110, 0.12);
  border-top-color: rgba(15, 118, 110, 0.95);
  animation: spin 1.15s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
