<template>
  <SuccessPopup
    v-if="isDisplayingSuccess"
    :message="successMsg"
    @close="isDisplayingSuccess = false"
  />

  <section class="admin-shell">
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p
          class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100"
        >
          Dashboard / Plans
        </p>
        <p class="section-kicker mt-4">Plans And Products</p>
        <h2 class="mt-3 text-3xl font-bold text-teal-700">Edit Plan or Product</h2>
        <p class="mt-2 text-sm text-gray-500">
          Update the details below and save when you are ready.
        </p>
      </div>
    </div>

    <p v-if="showErrorMessage" class="error mb-6 pb-0">{{ errorMsg }}</p>

    <div
      v-if="isFetching"
      class="admin-panel py-16 text-center text-sm font-medium text-gray-500"
    >
      Loading plan details...
    </div>

    <form v-else @submit.prevent="submitUpdatedProduct" class="admin-form">
      <div class="admin-panel space-y-6">
        <div class="flex flex-col">
          <label for="productName" class="modern-label">
            Plan/Product Name <span class="text-red-600">*</span>
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Enter plan name"
            v-model="productName"
            class="modern-input"
          />
        </div>

        <div class="flex flex-col">
          <label for="category" class="modern-label">
            Category <span class="text-red-600">*</span>
          </label>
          <select id="category" v-model="category" class="modern-input">
            <option value="" disabled>Pick a category</option>
            <option
              v-for="item in categories"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </option>
          </select>
          <p class="mt-3 text-sm text-gray-500">
            Pick the closest category for this item so the catalog stays easy to browse.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div class="flex flex-col">
            <label for="price" class="modern-label">
              Price <span class="text-red-600">*</span>
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter a price"
              v-model="price"
              class="modern-input"
            />
          </div>
          <div class="flex flex-col">
            <label for="offer" class="modern-label">Discount / Offer</label>
            <input
              id="offer"
              type="number"
              placeholder="Optional discount"
              v-model="offer"
              class="modern-input"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <label for="description" class="modern-label">
            Description <span class="text-red-600">*</span>
          </label>
          <TipTap v-model="description" />
        </div>
      </div>

      <div class="admin-panel">
        <p class="modern-label">Image Upload</p>
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
            <p class="text-lg font-semibold text-gray-800">Drag and drop image here</p>
            <p class="text-sm text-gray-500">PNG or JPG up to 2MB</p>
            <label class="btn" for="drop">Select Image</label>
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
          {{
            dropzoneFile?.name
              ? `New image: ${dropzoneFile.name}`
              : currentImageLabel
          }}
        </p>

        <div
          class="mt-5 overflow-hidden rounded-[24px] border border-stone-200 bg-white"
        >
          <div class="flex aspect-[4/3] items-center justify-center bg-stone-100">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Image Preview"
              class="h-full w-full object-cover"
            />
            <div v-else class="px-6 text-center text-sm text-gray-400">
              The selected image preview will appear here.
            </div>
          </div>
          <div class="p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              Preview
            </p>
            <p class="mt-2 text-lg font-bold text-gray-900">
              {{ productName || "Plan title preview" }}
            </p>
            <p class="mt-1 text-sm text-gray-500">
              {{ selectedCategoryName || "Choose a category to continue" }}
            </p>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="btn mt-6 w-full justify-center py-3"
        >
          <p v-if="!isLoading">Save Changes</p>
          <div v-else class="flex items-center gap-2">
            <UIcon
              class="animate-spin"
              name="heroicons:arrow-path-16-solid"
              dynamic
            />
            <span>Saving...</span>
          </div>
        </button>
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
const productName = ref("");
const category = ref("");
const price = ref(0);
const offer = ref(0);
const description = ref("");
const productImage = ref(null);
const imagePreview = ref(null);
const existingImage = ref("");
const isDisplayingSuccess = ref(false);
const isLoading = ref(false);
const isFetching = ref(true);
const successMsg = ref("");
const errorMsg = ref("");
const showErrorMessage = ref(false);
const categories = ref([]);
const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
  isDragging.value = !isDragging.value;
};

const selectedCategoryName = computed(() => {
  return categories.value.find((item) => item._id === category.value)?.name || "";
});

const currentImageLabel = computed(() => {
  return existingImage.value ? "Current image is shown below." : "No image selected yet.";
});

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
    productImage.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    dropzoneFile.value = null;
    productImage.value = null;
    imagePreview.value = existingImage.value || null;
  }
};

const validateForm = () => {
  if (!productName.value.trim()) return "Product name is required.";
  if (!category.value.trim()) return "Category is required.";
  if (!price.value || isNaN(price.value) || price.value <= 0) {
    return "Price must be a valid positive number.";
  }
  if (offer.value !== null && offer.value !== "" && (isNaN(offer.value) || offer.value < 0)) {
    return "Offer must be a valid non-negative number.";
  }
  if (!description.value.trim()) return "Description is required.";
  return null;
};

const handleValidationErrors = (message) => {
  errorMsg.value = message;
  showErrorMessage.value = true;
  setTimeout(() => {
    showErrorMessage.value = false;
    errorMsg.value = "";
  }, 5500);
};

const loadPageData = async () => {
  try {
    isFetching.value = true;
    const [categoriesData, product] = await Promise.all([
      $fetch(`${backend}/category`),
      $fetch(`${backend}/products/${_id}`),
    ]);

    categories.value = categoriesData;
    productName.value = product.productName || "";
    category.value = product.category || "";
    price.value = product.price || 0;
    offer.value = product.offer || 0;
    description.value = product.description || "";
    existingImage.value = product.productImage ? `${backend}${product.productImage}` : "";
    imagePreview.value = existingImage.value || null;
  } catch (error) {
    console.error("Error loading product:", error);
    handleValidationErrors("Unable to load this plan right now.");
  } finally {
    isFetching.value = false;
  }
};

onMounted(loadPageData);

const submitUpdatedProduct = async () => {
  const validationError = validateForm();
  if (validationError) {
    handleValidationErrors(validationError);
    return;
  }

  try {
    isLoading.value = true;
    const formData = new FormData();
    formData.append("productName", productName.value);
    formData.append("category", category.value);
    formData.append("price", price.value);
    formData.append("offer", offer.value || 0);
    formData.append("description", description.value);
    if (productImage.value) {
      formData.append("productImage", productImage.value);
    }

    const response = await $fetch(`${backend}/products/${_id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.success === true) {
      isDisplayingSuccess.value = true;
      successMsg.value = response.message;
      setTimeout(() => {
        isDisplayingSuccess.value = false;
        navigateTo("/dashboard/viewproducts");
      }, 3500);
      return;
    }

    handleValidationErrors(response.message || "Failed to update plan. Please try again.");
  } catch (error) {
    console.error("Error updating product:", error);
    handleValidationErrors("Failed to update plan. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>
