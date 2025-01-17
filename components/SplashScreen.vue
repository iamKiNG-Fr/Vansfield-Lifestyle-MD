<template>
    <transition name="fade" @after-leave="onSplashComplete">
      <div
        v-if="isVisible"
        id="splash-screen"
        class="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      >
        <!-- Logo -->
        <img src="/assets/img/vansfield-logo.png" alt="Logo" class="h-20 w-20 animate-bounce" />
  
        <!-- Fade-in Text -->
        <p class="mt-5 text-lg md:text-2xl font-semibold text-gray-800">
          Vansfield Lifestyle MD
        </p>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { useSplash } from "../composables/useSplash";
  
  const { isVisible, setSplashComplete } = useSplash();
  
  function onSplashComplete() {
    setSplashComplete(); // Signal that the splash screen is done
  }
  </script>
  
  <style scoped>
  /* Transition styles */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  