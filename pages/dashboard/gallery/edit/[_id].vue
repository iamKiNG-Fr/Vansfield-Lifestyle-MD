<template>
  <SuccessPopup
    v-if="isDisplayingSuccess"
    :message="successMsg"
    @close="isDisplayingSuccess = false"
  />

  <section class="admin-shell">
    <div class="mb-8">
      <p class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
        Dashboard / Gallery
      </p>
      <p class="section-kicker mt-4">Gallery Management</p>
      <h2 class="mt-3 text-3xl font-bold text-teal-700">Edit Image</h2>
      <p class="mt-2 text-sm text-gray-500">
        Update the caption, location, gallery visibility, or replace the image with a cleaner version.
      </p>
    </div>

    <p v-if="error" class="error mb-5 pb-0">{{ error }}</p>

    <form @submit.prevent="submitNewMemory" class="admin-form">
      <div class="admin-panel space-y-6">
        <div class="flex flex-col">
          <label for="title" class="modern-label">Image Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter a title"
            class="modern-input"
          />
        </div>

        <div class="flex flex-col">
          <label for="location" class="modern-label">Location</label>
          <input
            id="location"
            v-model="location"
            type="text"
            placeholder="Enter location"
            class="modern-input"
          />
        </div>

        <div>
          <p class="modern-label">Add To Gallery Slider?</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <label
              class="flex cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 transition hover:border-teal-400"
              :class="{ 'border-teal-600 bg-teal-50': isCarousel === 'true' }"
            >
              <input type="radio" v-model="isCarousel" value="true" />
              <div>
                <p class="font-semibold text-gray-900">Yes</p>
                <p class="text-sm text-gray-500">Feature this image in the main slider.</p>
              </div>
            </label>
            <label
              class="flex cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 transition hover:border-teal-400"
              :class="{ 'border-teal-600 bg-teal-50': isCarousel === 'false' }"
            >
              <input type="radio" v-model="isCarousel" value="false" />
              <div>
                <p class="font-semibold text-gray-900">No</p>
                <p class="text-sm text-gray-500">Keep it inside the gallery only.</p>
              </div>
            </label>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="description" class="modern-label">Description</label>
          <textarea
            id="description"
            v-model="description"
            rows="6"
            class="modern-input resize-none"
            placeholder="What was this event about?"
          ></textarea>
        </div>
      </div>

      <div class="space-y-6">
        <div class="admin-panel">
          <p class="modern-label">Current Image</p>
          <div class="overflow-hidden rounded-[24px] border border-stone-200 bg-white">
            <img
              :src="backend + image"
              :alt="title || 'Current gallery image'"
              class="h-[320px] w-full object-cover"
            />
            <div class="p-4">
              <p class="text-lg font-bold text-gray-900">{{ title || "Untitled image" }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ location || "Location not set" }}</p>
            </div>
          </div>
        </div>

        <div class="admin-panel">
          <p class="modern-label">Replace Image</p>
          <div
            class="dropzone"
            :class="{ 'active-dropzone': active }"
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="
              (e) => {
                toggleActive();
                drop(e);
              }
            "
          >
            <div
              v-if="!isDragging"
              class="flex flex-col items-center justify-center gap-3"
            >
              <div class="rounded-full bg-teal-100 p-4 text-teal-700">
                <UIcon name="heroicons:photo-solid" class="text-3xl" dynamic />
              </div>
              <p class="text-lg font-semibold text-gray-800">Drop a replacement image here</p>
              <p class="text-sm text-gray-500">Use a clean image for the best display result.</p>
              <label class="btn" for="drop">Choose New Image</label>
              <input
                type="file"
                id="drop"
                name="file"
                ref="fileInput"
                class="dropzoneFile hidden"
                @change="selectedFile"
              />
            </div>
            <div v-else>
              <span class="text-lg font-semibold text-teal-700">Drop image here</span>
            </div>
          </div>

          <p class="mt-4 text-sm font-medium text-teal-700">
            {{ dropzoneFile?.name ? `Selected: ${dropzoneFile.name}` : "No replacement image selected yet." }}
          </p>

          <div
            class="mt-5 overflow-hidden rounded-[24px] border border-stone-200 bg-white"
          >
            <div class="flex aspect-[4/3] items-center justify-center bg-stone-100">
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Updated image preview"
                class="h-full w-full object-cover"
              />
              <div v-else class="px-6 text-center text-sm text-gray-400">
                A preview of the replacement image will appear here.
              </div>
            </div>
            <div class="p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                Preview
              </p>
              <p class="mt-2 text-lg font-bold text-gray-900">
                {{ title || "Updated gallery preview" }}
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn mt-6 w-full justify-center py-3"
          >
            <span v-if="!isLoading">Update Gallery</span>
            <span v-else class="animate-pulse">Saving...</span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
const { _id } = useRoute().params;

definePageMeta({
  layout: "dashboard",
  middleware: "verify",
  role: "sAdmin" || "admin",
});

const backend = useRuntimeConfig().public.backendUrl;

const fileInput = ref(null);
const dropzoneFile = ref(null);
const isDragging = ref(false);
const isCarousel = ref("false");
const title = ref("");
const description = ref("");
const location = ref("");
const image = ref("");
const imagePreview = ref(null);
const isDisplayingSuccess = ref(false);
const isLoading = ref(false);
const error = ref("");

const successMsg = ref("");
const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
  isDragging.value = !isDragging.value;
};

const drop = (e) => {
  const file = e.dataTransfer.files[0];
  handleFile(file);
};

const selectedFile = () => {
  const file = document.querySelector(".dropzoneFile").files[0];
  handleFile(file);
};

const handleFile = (file) => {
  if (file) {
    dropzoneFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    dropzoneFile.value = null;
    imagePreview.value = null;
  }
};

const submitNewMemory = async () => {
  try {
    isLoading.value = true;
    error.value = "";

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("isCarousel", isCarousel.value);
    formData.append("location", location.value);
    formData.append("description", description.value);
    if (dropzoneFile.value) {
      formData.append("image", dropzoneFile.value);
    }

    const response = await $fetch(`${backend}/gallery/${_id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.success === true) {
      isDisplayingSuccess.value = true;
      successMsg.value = response.message;
      setTimeout(() => {
        isDisplayingSuccess.value = false;
        navigateTo("/dashboard/gallery/viewgallery");
      }, 3500);
    }
  } catch (uploadError) {
    console.error("Error updating gallery item:", uploadError);
    error.value = "Failed to update this image. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const memory = await $fetch(`${backend}/gallery/${_id}`, {
    method: "GET",
  });

  if (memory) {
    title.value = memory.title;
    isCarousel.value = String(memory.isCarousel);
    location.value = memory.location;
    description.value = memory.description;
    image.value = memory.image;
  }
});
</script>
