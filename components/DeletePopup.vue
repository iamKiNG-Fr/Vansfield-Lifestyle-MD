<template>
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-white/18 px-4 py-6 backdrop-blur-[4px]"
    @click.self="$emit('removeDeletePopup')"
  >
    <div
      class="w-full max-w-md rounded-[28px] border border-white/90 bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,0.14)] sm:max-w-lg sm:rounded-[30px] sm:p-6"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
            Delete
          </p>
          <h2 class="mt-3 text-2xl font-bold text-gray-900">Confirm removal</h2>
          <p class="mt-3 text-sm leading-7 text-gray-500">
            Are you sure you want to delete "{{ productName }}"? This action cannot be undone.
          </p>
        </div>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-2xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          @click="$emit('removeDeletePopup')"
        >
          &times;
        </button>
      </div>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          class="w-full flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
          :disabled="isDeleting"
          @click="$emit('deleteProduct', id)"
        >
          {{ isDeleting ? "Deleting..." : "Yes, Delete" }}
        </button>
        <button
          type="button"
          class="w-full flex-1 rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
          @click="$emit('removeDeletePopup')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["productName", "id", "isDeleting"]);
</script>
