<template>
  <UBreadcrumb :links="links" class="mb-5" />
  <p v-if="showDeleteSuccess" class=" text-green-600 italics">{{ deleteMsg }}</p>
    <DeletePopup
      v-if="isDisplayingDelete"
      :productName="selectedImage?.title"
      :id="selectedImage?._id"
      @removeDeletePopup="isDisplayingDelete = false"
      @deleteProduct="deleteProduct"
    />
  <div>
    <h2 class="font-bold text-teal-700 text-2xl mb-8">View Gallery</h2>
  </div>
  <div>
    <div>
      <div v-if="gallery.length === 0" class="text-center">Loading...</div>
      <div
        v-else
        class="md:gap-8 gap-4 mt-8 md:flex md:flex-wrap grid grid-cols-2"
      >
        <AdminGalleryImage
          v-for="(image, index) in gallery"
          :key="index"
          class="bg-gray-200 md:h-72 md:w-52 h-52 rounded-md shadow-lg"
          :image="image"
          @showDeletePopup="isDisplayingDelete = !isDisplayingDelete"
          @mouseover="selectedImage = image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "View Gallery",
    icon: "i-heroicons-photo-16-solid",
  },
];

definePageMeta({
  layout: "dashboard",
  middleware: "verify",
  role: "sAdmin" || "admin",
});

const { token } = useAuthState();

const gallery = ref([]);
const isDisplayingDelete = ref(false);
const backend = useRuntimeConfig().public.backendUrl;
const selectedImage = ref();
const deleteMsg = ref("")
const showDeleteSuccess = ref(false)

const fetchGallery = async () => {
  try {
    const data = await $fetch(`${backend}/gallery`, {
      method: "get",
      headers: token.value ? { Authorization: token.value } : {},
    });
    gallery.value = data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    isDisplayingDelete.value = false
    const data = await $fetch(`${backend}/gallery/${id}`, {
      method: "DELETE",
      headers: token.value ? { Authorization: token.value } : {},
    });
    gallery.value = gallery.value.filter((image) => image._id !== id);
    deleteMsg.value = data.message;
    showDeleteSuccess.value = true
    setTimeout(() => {
        showDeleteSuccess.value = false;
      }, 3500);
  } catch (error) {
    console.log(error);
  }
}


onMounted(() => {
  fetchGallery();
});
</script>

<style lang="scss" scoped></style>
