<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[80] flex items-center justify-center bg-white/30 px-4 backdrop-blur-[6px]"
    @click.self="closePopup"
  >
    <div
      class="w-full max-w-md rounded-[30px] border border-white/90 bg-white p-6 text-center shadow-[0_30px_90px_rgba(15,23,42,0.16)]"
    >
      <div class="flex justify-end">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-2xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          @click="closePopup"
        >
          &times;
        </button>
      </div>

      <div class="-mt-2">
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-600 shadow-[0_18px_36px_rgba(16,185,129,0.18)]"
        >
          ✓
        </div>
        <p class="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Success
        </p>
        <p class="mt-3 text-xl font-bold text-gray-900">
          {{ message }}
        </p>
        <p class="mt-3 text-sm leading-7 text-gray-500">
          Everything completed successfully.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["message"]);
const emit = defineEmits(["close"]);

const isVisible = ref(true);

const closePopup = () => {
  isVisible.value = false;
  emit("close");
};

watch(
  () => props.message,
  () => {
    isVisible.value = true;
  }
);
</script>
