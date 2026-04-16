<template>
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-white/30 px-4 backdrop-blur-[6px]"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-3xl rounded-[30px] border border-white/90 bg-white p-6 shadow-[0_35px_90px_rgba(15,23,42,0.16)] lg:p-8"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Interest Request
          </p>
          <h2 class="mt-3 text-3xl font-bold text-gray-900">Request details</h2>
        </div>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-2xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Plan</p>
          <p class="mt-3 text-base font-semibold text-gray-900">{{ request.productName }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Category</p>
          <p class="mt-3 text-base font-semibold text-gray-900">{{ request.categoryName }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Name</p>
          <p class="mt-3 text-base font-semibold text-gray-900">{{ request.requesterName }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Email</p>
          <p class="mt-3 break-all text-base font-semibold text-gray-900">{{ request.email }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Phone</p>
          <p class="mt-3 text-base font-semibold text-gray-900">{{ request.phone || "Not provided" }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Status</p>
          <p class="mt-3 text-base font-semibold capitalize text-gray-900">{{ request.status }}</p>
        </div>
        <div class="rounded-[22px] bg-stone-50 px-4 py-4 sm:col-span-2">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Message</p>
          <p class="mt-3 min-h-[96px] text-base leading-7 text-gray-700">{{ request.notes || "No extra notes" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["request"]);
defineEmits(["close"]);
</script>
