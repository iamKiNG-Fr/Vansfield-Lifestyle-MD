<template>
  <div
    class="w-screen backdrop-blur-sm bg-gray-800 bg-opacity-10 inset-0 h-screen fixed flex justify-center items-center z-30"
  >
    <div
      class="delete-card bg-white p-6 flex flex-col gap-3 rounded-lg mx-auto z-20 relative w-[25rem]"
    >
      <p class="text-2xl font-bold">Add Category</p>
      <UIcon
        name="i-heroicons-x-mark-16-solid"
        class="absolute top-7 right-8 hover:text-red-500 text-3xl"
        @click="$emit('closeCategoryPopup')"
      />
      <div v-if="showMessage">
        <p :class="res.success ? 'text-green-700' : 'text-red-700'">
          {{ res.message }}
        </p>
      </div>
      <form @submit.prevent="addCategory">
        <input
          type="text"
          v-model="category"
          class="bg-white w-full px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
        />
        <button
          type="submit"
          :disabled="isLoading === true"
          class="btn2 w-full p-3 text-lg mt-7"
        >
          <p v-show="!isLoading">Add</p>
          <UIcon
            class="animate-spin"
            name="heroicons:arrow-path-16-solid"
            dynamic
            v-show="isLoading"
          />
        </button>
      </form>
      <h3>Available Categories</h3>
      <div>
        <div v-if="!categories" class="text-center">
          <UIcon
            name="svg-spinners:12-dots-scale-rotate"
            class="text-teal-800 text-4xl"
            dynamic
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="flex items-center gap-1 border border-3 border-teal-700 rounded-full px-2"
          >
            <p class="">{{ category.name }}</p>

            <UIcon
              v-if="!isDeleteLoading"
              name="material-symbols:close-rounded"
              class="hover:text-red-600 cursor-pointer"
              @click="deleteCategory(category._id)"
              dynamic
            />
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

watch(res, async ()=>{
    const data = await $fetch(`${backend}/category`, {method: "GET"});
    categories.value = data;
})

const deleteCategory = async (id) => {
  isDeleteLoading.value = true;
  const response = await $fetch(`${backend}/category/${id}`, {
    method: "DELETE",
  });
  categories.value = categories.value.filter((category) => category._id !== id);
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
    if (response.success === true) {
      isLoading.value = false;
      showMessage.value = true;
      res.value = response;
    } else {
      isLoading.value = false;
      showMessage.value = true;
      res.value = response;
    }
    category.value = "";
  } catch (error) {
    res.value = {
      success: false,
      text: "An error occurred while processing your request.",
    };
  }
};
</script>
