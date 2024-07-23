<template>
  <UBreadcrumb :links="links" class="mb-5" />

  <div>
    <h2 class="font-bold text-teal-700 text-2xl mb-8">Add Products</h2>
  </div>
  <form
    @submit.prevent="submitNewProduct"
    class="p-10 bg-white mt-10 flex gap-10 justify-center"
  >
    <div class="w-1/2">
      <div class="flex flex-col">
        <label for="productName" class="font-bold text-lg">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          v-model="productName"
          class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
        />
      </div>
      <div class="flex flex-col pt-8">
        <label for="category" class="font-bold text-lg">Category</label>
        <select
          v-model="category"
          class="bg-white px-5 pt-3 pb-1 border-b-4 focus:outline-none border-teal-700 focus:border-yellow-400 font-medium text-lg"
        >
          <option value="" disabled selected>Pick a category</option>
          <option v-for="category in categories" :key="category._id" :value="category._id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-10">
        <div class="flex flex-col pt-8">
          <label for="price" class="font-bold text-lg">Price</label>
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
        <label for="description" class="font-bold text-lg">Description</label>
        <textarea
          v-model="description"
          rows="5"
          class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg resize-none focus:outline-none"
          placeholder="Describe the product here"
        ></textarea>
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

      <button type="submit" class="btn2 w-full p-3 text-lg mt-7">
        Add Product
      </button>
    </div>
  </form>
</template>

<script setup>
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
    label: "Add Product",
    icon: "i-heroicons-plus-16-solid",
  },
];

const fileInput = ref(null);
let dropzoneFile = ref("");
const isDragging = ref(false);
const productName = ref("");
const category = ref("");
const price = ref(0);
const offer = ref(0);
const description = ref("");
const productImage = ref(null);
const imagePreview = ref(null);

const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
  isDragging.value = !isDragging.value;
};
const drop = (e) => {
  // dropzoneFile.value = e.dataTransfer.files[0]
  const file = e.dataTransfer.files[0];
  handleFile(file);
};
const selectedFile = () => {
  // dropzoneFile.value = document.querySelector('.dropzoneFile').files[0]
  const file = document.querySelector(".dropzoneFile").files[0];
  // const file = e.dataTransfer.files[0];
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

const categories = ref([])

onMounted( async() => {
  const categoriesData = await $fetch(`${backend}/category`);
  categories.value = categoriesData
});

const submitNewProduct = async () => {
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
    const response = await $fetch(`${backend}/products`, {
      method: "POST",
      body: formData,
    });

    console.log("Product uploaded successfully:", response);
    alert(`"${productName.value}" added successfully!`);

    productName.value = "";
    category.value = "";
    price.value = 0;
    offer.value = 0;
    description.value = "";
    productImage.value = null;
    dropzoneFile.value = null;
  } catch (error) {
    console.error("Error uploading product:", error);
  }
};
</script>
