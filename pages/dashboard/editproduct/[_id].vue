<template>
  <UBreadcrumb :links="links" class="mb-5" />
  <SuccessPopup v-if="isDisplayingSuccess" :message="successMsg" />
  <AddCategory
    v-if="showAddCategory"
    @closeCategoryPopup="showAddCategory = false"
  />
  <p v-if="showErrorMessage" class="text-red-600 italic">{{ errorMsg }}</p>
  <div>
    <h2 class="font-bold text-teal-700 text-2xl mb-8">Edit Product</h2>
    <p class="text-sm text-gray-500 italic">
      Fields marked with <span class="text-red-600">*</span> are required.
    </p>
  </div>
  <form
    @submit.prevent="submitNewProduct"
    class="p-10 bg-white mt-10 flex gap-10 justify-center"
  >
    <div class="w-1/2">
      <div class="flex flex-col">
        <label for="productName" class="font-bold text-lg"
          >Product Name<span class="text-red-600">*</span></label
        >
        <input
          type="text"
          placeholder="Enter product name"
          v-model="productName"
          class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
        />
      </div>
      <div class="flex flex-col pt-8">
        <label for="category" class="font-bold text-lg"
          >Category<span class="text-red-600">*</span></label
        >
        <select
          v-model="category"
          class="bg-white px-5 pt-3 pb-1 border-b-4 focus:outline-none border-teal-700 focus:border-yellow-400 font-medium text-lg"
        >
          <option value="" disabled selected>Pick a category</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
        <div
          class="flex items-center mt-3 hover:underline text-sm text-teal-700 font-semibold cursor-pointer"
          @click="showAddCategory = !showAddCategory"
        >
          <UIcon name="i-heroicons-plus-small-20-solid" class="text-2xl" />
          <p class="italic">Add a category</p>
        </div>
      </div>
      <div class="flex gap-10">
        <div class="flex flex-col pt-8">
          <label for="price" class="font-bold text-lg"
            >Price<span class="text-red-600">*</span></label
          >
          <input
            type="number"
            placeholder="Enter a price"
            v-model="price"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
          />
        </div>
        <div class="flex flex-col pt-8">
          <label for="offer" class="font-bold text-lg">offer</label>
          <input
            type="number"
            placeholder="Enter an offer"
            v-model="offer"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
          />
        </div>
      </div>
      <div class="flex flex-col pt-8">
        <label for="description" class="font-bold text-lg"
          >Description <span class="text-red-600">*</span></label
        >
        <TipTap v-model="description" />
      </div>
    </div>
    <div class="w-1/2">
      <div>
        <label for="" class="font-bold text-lg">Upload Image</label>
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
            class="flex flex-col justify-center items-center gap-2"
          >
            <span class="">Drag and Drop Image Here</span>
            <span>OR</span>
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
            <span class="">Drop Image Here</span>
          </div>
        </div>
        <span class="text-teal-700">Image: {{ dropzoneFile.name }}</span>
      </div>
      <div v-if="imagePreview" class="mt-4">
        <img
          :src="imagePreview"
          alt="Image Preview"
          class="w-28 h-28 object-cover rounded-xl mx-auto"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading === true"
        class="btn2 w-full p-3 text-lg mt-7"
      >
        <p v-if="!isLoading">Add Product</p>
        <UIcon
          class="animate-spin"
          name="heroicons:arrow-path-16-solid"
          dynamic
          v-else
        />
      </button>
    </div>
  </form>
</template>

<script setup>
const { _id } = useRoute().params;

definePageMeta({
  layout: "dashboard",
});

const backend = useRuntimeConfig().public.backendUrl;

const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "Edit Product",
    icon: "i-heroicons-pencil-square-20-solid",
  },
];

const fileInput = ref(null);
let dropzoneFile = ref("");
const isDragging = ref(false);
const productName = ref("");
const category = ref("");
const price = ref("");
const offer = ref("");
const description = ref("");
const productImage = ref(null);
const imagePreview = ref(null);
const isDisplayingSuccess = ref(false);
const error = ref("");
const isLoading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");
const showErrorMessage = ref(false);
const categories = ref([]);
const showAddCategory = ref(false);

const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
  isDragging.value = !isDragging.value;
};
const drop = (e) => {
  //   dropzoneFile.value = e.dataTransfer.files[0];
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
    imagePreview.value = null;
  }
};

// Validation Function
const validateForm = () => {
  if (!productName.value.trim()) return "Product name is required.";
  if (!category.value.trim()) return "Category is required.";
  if (!price.value || isNaN(price.value) || price.value <= 0) {
    return "Price must be a valid positive number.";
  }
  if (offer.value !== null && (isNaN(offer.value) || offer.value < 0)) {
    return "Offer must be a valid non-negative number.";
  }
  if (!description.value.trim()) return "Description is required.";
  return null; // No errors
};

// Handle Validation Errors
const handleValidationErrors = (message) => {
  errorMsg.value = message;
  showErrorMessage.value = true;
  setTimeout(() => {
    showErrorMessage.value = false;
    errorMsg.value = "";
  }, 5500);
};

onMounted(async () => {
  const categoriesData = await $fetch(`${backend}/category`);
  categories.value = categoriesData;

});


const submitNewProduct = async () => {
  const error = validateForm();
  if (error) {
    handleValidationErrors(error); // Stop submission and show validation error
    return;
  }

  try {
    const formData = new FormData();
    formData.append("productName", productName.value);
    formData.append("category", category.value);
    formData.append("price", price.value);
    formData.append("offer", offer.value);
    formData.append("description", description.value);
    if (productImage.value) {
      formData.append("productImage", productImage.value);
    }
    console.log(formData);
    
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
    }
    if (response.success === false) {
      showErrorMessage.value = true;
      errorMsg.value = response.message;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3500);
    }
  } catch (error) {
    console.error("Error uploading product:", error);
  }
};

watch(showAddCategory, async()=>{
  const categoriesData = await $fetch(`${backend}/category`);
  categories.value = categoriesData;
})

const { data: product } = await useFetch(`${backend}/products/${_id}`);
onMounted(async () => {

  const categoriesData = await $fetch(`${backend}/category`);
  categories.value = categoriesData;
  

  //   console.log(product.value);
  if (product) {
    productName.value = product.value.productName;
    category.value = product.value.category;
    price.value = product.value.price;
    offer.value = product.value.offer;
    description.value = product.value.description;
  }
});
</script>
