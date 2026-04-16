<template>
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-white/30 px-4 backdrop-blur-[6px]"
    @click.self="$emit('closeCategoryPopup')"
  >
    <div
      class="w-full max-w-2xl rounded-[30px] border border-white/90 bg-white p-6 shadow-[0_35px_90px_rgba(15,23,42,0.16)]"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Catalog
          </p>
          <h2 class="mt-3 text-3xl font-bold text-gray-900">Manage categories</h2>
          <p class="mt-2 text-sm leading-7 text-gray-500">
            Add a new category or remove one that is no longer needed.
          </p>
        </div>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-2xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          @click="$emit('closeCategoryPopup')"
        >
          &times;
        </button>
      </div>

      <p v-if="showMessage" class="mt-5 text-sm font-semibold" :class="res?.success ? 'text-emerald-700' : 'text-red-600'">
        {{ res?.message || res?.text }}
      </p>

      <form class="mt-6" @submit.prevent="addCategory">
        <div class="flex flex-col">
          <label class="modern-label">Category Name</label>
          <input
            v-model="category"
            type="text"
            class="modern-input"
            placeholder="Enter a category name"
          />
        </div>
        <div class="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            :disabled="isLoading"
            class="btn flex-1 justify-center py-3"
          >
            <span v-if="!isLoading">Add Category</span>
            <span v-else class="animate-pulse">Saving...</span>
          </button>
          <button
            type="button"
            class="flex-1 rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            @click="$emit('closeCategoryPopup')"
          >
            Close
          </button>
        </div>
      </form>

      <div class="mt-8">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Available Categories
        </p>
        <div v-if="!categories" class="mt-5 text-sm text-gray-500">
          Loading categories...
        </div>
        <div v-else class="mt-5 flex flex-wrap gap-3">
          <div
            v-for="item in categories"
            :key="item._id"
            class="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700"
          >
            <span>{{ item.name }}</span>
            <button
              v-if="!isDeleteLoading"
              type="button"
              class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-base text-red-500 transition hover:bg-red-50 hover:text-red-600"
              @click="deleteCategory(item._id)"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const category = ref("");
const showMessage = ref(false);
const isLoading = ref(false);
const isDeleteLoading = ref(false);
const res = ref();
const backend = useRuntimeConfig().public.backendUrl;
const categories = ref();

const { data } = await useFetch(`${backend}/category`);
categories.value = data.value;

watch(res, async () => {
  const response = await $fetch(`${backend}/category`, { method: "GET" });
  categories.value = response;
});

const deleteCategory = async (id) => {
  isDeleteLoading.value = true;
  const response = await $fetch(`${backend}/category/${id}`, {
    method: "DELETE",
  });

  categories.value = categories.value.filter((item) => item._id !== id);

  if (response.success === true) {
    isDeleteLoading.value = false;
    showMessage.value = true;
    res.value = response;
  }
};

const addCategory = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch(`${backend}/category`, {
      method: "POST",
      body: { name: category.value },
    });

    showMessage.value = true;
    res.value = response;
    category.value = "";
  } catch (error) {
    res.value = {
      success: false,
      text: "An error occurred while processing your request.",
    };
  } finally {
    isLoading.value = false;
  }
};
</script>
