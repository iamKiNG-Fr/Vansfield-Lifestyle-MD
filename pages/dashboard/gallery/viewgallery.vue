<template>
  <DeletePopup
    v-if="isDisplayingDelete"
    :productName="selectedImage?.title"
    :id="selectedImage?._id"
    :isDeleting="isDeleting"
    @removeDeletePopup="isDisplayingDelete = false"
    @deleteProduct="deleteImage"
  />

  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
          Dashboard / Gallery
        </p>
        <p class="section-kicker mt-2">Gallery Library</p>
        <h2 class="mt-3 text-2xl font-bold text-teal-700">View Gallery</h2>
      </div>
      <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">
        {{ gallery.length }} images
      </div>
    </div>

    <p v-if="showDeleteSuccess" class="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
      {{ deleteMsg }}
    </p>

    <div v-if="isLoading" class="table-shell p-6 text-sm text-gray-500">
      Loading gallery...
    </div>

    <div
      v-else-if="gallery.length === 0"
      class="table-shell p-8 text-center text-gray-500"
    >
      No gallery images found.
    </div>

    <div v-else class="space-y-5">
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="image in paginatedGallery"
        :key="image._id"
        class="card overflow-hidden"
      >
        <img
          :src="backend + image.image"
          :alt="image.title"
          class="h-56 w-full object-cover"
        />
        <div class="p-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-lg font-bold text-gray-900">{{ image.title || "Untitled image" }}</p>
              <p class="mt-2 text-sm text-gray-500">{{ image.location || "No location set" }}</p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="image.isCarousel === 'true' || image.isCarousel === true ? 'bg-yellow-100 text-yellow-800' : 'bg-stone-100 text-gray-700'"
            >
              {{ image.isCarousel === 'true' || image.isCarousel === true ? "Featured" : "Gallery" }}
            </span>
          </div>
          <p class="mt-4 text-sm leading-7 text-gray-500">
            {{ image.description || "No description added yet." }}
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <button
              class="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              @click="openDelete(image)"
            >
              Delete
            </button>
            <button
              class="btn2"
              @click="navigateTo(`/dashboard/gallery/edit/${image._id}`)"
            >
              Edit
            </button>
          </div>
        </div>
      </article>
      </div>

      <AdminPagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :total-items="gallery.length"
        :total-pages="totalPages"
        item-label="images"
      />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "verify",
  role: "sAdmin" || "admin",
});

const { token } = useAuthState();
const backend = useRuntimeConfig().public.backendUrl;

const gallery = ref([]);
const isDisplayingDelete = ref(false);
const selectedImage = ref(null);
const deleteMsg = ref("");
const showDeleteSuccess = ref(false);
const isDeleting = ref(false);
const isLoading = ref(true);
const currentPage = ref(1);
const pageSize = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(gallery.value.length / pageSize))
);

const paginatedGallery = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return gallery.value.slice(start, start + pageSize);
});

const fetchGallery = async () => {
  try {
    isLoading.value = true;
    const data = await $fetch(`${backend}/gallery`, {
      method: "GET",
      headers: token.value ? { Authorization: token.value } : {},
    });
    gallery.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const openDelete = (image) => {
  selectedImage.value = image;
  isDisplayingDelete.value = true;
};

const deleteImage = async (id) => {
  try {
    isDeleting.value = true;
    isDisplayingDelete.value = false;
    const data = await $fetch(`${backend}/gallery/${id}`, {
      method: "DELETE",
      headers: token.value ? { Authorization: token.value } : {},
    });
    gallery.value = gallery.value.filter((image) => image._id !== id);
    deleteMsg.value = data.message;
    showDeleteSuccess.value = true;
    setTimeout(() => {
      showDeleteSuccess.value = false;
    }, 3500);
  } catch (error) {
    console.log(error);
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchGallery);

watch(
  () => totalPages.value,
  (value) => {
    if (currentPage.value > value) {
      currentPage.value = value;
    }
  }
);
</script>
