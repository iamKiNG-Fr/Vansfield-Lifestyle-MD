import { ref } from "vue";
import { useRouter } from "vue-router";

export function useSplash() {
  const isVisible = ref(true);
  const isComplete = ref(false);
  const router = useRouter();

  router.isReady().then(() => {
    setTimeout(() => {
      isVisible.value = false;
    }, 2000); // Splash duration
  });

  function setSplashComplete() {
    isComplete.value = true; // Mark splash as complete
  }

  return { isVisible, isComplete, setSplashComplete };
}
