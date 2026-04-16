<template>
  <div
    v-if="totalPages > 1"
    class="flex flex-col gap-4 rounded-[24px] border border-stone-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between"
  >
    <p class="text-sm text-gray-500">
      Showing
      <span class="font-semibold text-gray-900">{{ rangeStart }}</span>
      -
      <span class="font-semibold text-gray-900">{{ rangeEnd }}</span>
      of
      <span class="font-semibold text-gray-900">{{ totalItems }}</span>
      {{ itemLabel }}
    </p>

    <div class="flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-teal-200 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-45"
        :disabled="page <= 1"
        @click="$emit('update:page', page - 1)"
      >
        Prev
      </button>

      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        type="button"
        class="h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition"
        :class="
          pageNumber === page
            ? 'bg-teal-700 text-white shadow-[0_12px_24px_rgba(15,118,110,0.18)]'
            : 'border border-stone-200 bg-white text-gray-600 hover:border-teal-200 hover:text-teal-700'
        "
        @click="$emit('update:page', pageNumber)"
      >
        {{ pageNumber }}
      </button>

      <button
        type="button"
        class="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-teal-200 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-45"
        :disabled="page >= totalPages"
        @click="$emit('update:page', page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 6,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  itemLabel: {
    type: String,
    default: "items",
  },
});

defineEmits(["update:page"]);

const rangeStart = computed(() => (props.totalItems === 0 ? 0 : (props.page - 1) * props.pageSize + 1));
const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.totalItems));

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.page - 2);
  const end = Math.min(props.totalPages, start + 4);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return pages;
});
</script>
