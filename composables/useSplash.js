import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export function useSplash() {
  const isVisible = ref(true);
  const isComplete = ref(false);
  const router = useRouter();

  onBeforeMount(() => {
    // Check if the splash screen has already been shown
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      // Show the splash screen on the first visit
      isVisible.value = true;

      router.isReady().then(() => {
        setTimeout(() => {
          isVisible.value = false; // Hide splash after 2 seconds
          sessionStorage.setItem("hasSeenSplash", "true"); // Mark splash as shown
        }, 2000); // Splash duration
      });
    } else {
      // If splash has already been seen, hide it immediately
      isVisible.value = false;
    }
  });

  function setSplashComplete() {
    isComplete.value = true; // Mark splash as complete
  }

  return { isVisible, isComplete, setSplashComplete };
}
