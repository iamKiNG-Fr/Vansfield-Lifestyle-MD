<template>
    <UBreadcrumb :links="links" class="mb-5" />
    <SuccessPopup v-if="isDisplayingSuccess" :productName="productName" />
    <div>
      <h2 class="font-bold text-teal-700 text-2xl mb-8">Add Image</h2>
    </div>
    <form
      @submit.prevent="submitNewMemory"
      class="p-10 bg-white mt-10 flex gap-10 justify-center"
    >
      <p v-if="error" class="error">{{ error }}</p>
      <div class="w-1/2 flex flex-col gap-8">
        <div class="flex flex-col">
          <label for="title" class="font-bold text-lg">Image Title</label>
          <input
            type="text"
            placeholder="Enter a title"
            v-model="title"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
          />
        </div>
        <div class="flex flex-col ">
          <label for="location" class="font-bold text-lg">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            v-model="location"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
          />
        </div>
        <div class="flex gap-4">
          <p class="font-bold text-lg">Add to Gallery Slider?</p>
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              placeholder="Enter location"
              v-model="isCarousel"
              value="true"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
            />
            <label for="">Yes</label>
          </div>
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              placeholder="Enter location"
              v-model="isCarousel"
              value="false"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg focus:outline-none"
            />
            <label for="">No</label>
          </div>
        </div>
  
        <div class="flex flex-col">
          <label for="description" class="font-bold text-lg">Description</label>
          <textarea
            v-model="description"
            rows="5"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg resize-none focus:outline-none"
            placeholder="What was this event about?"
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
  
        <button
          type="submit"
          :disabled="isLoading === true"
          class="btn2 w-full p-3 text-lg mt-7"
        >
          <p v-if="!isLoading">Add to Gallery</p>
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
  definePageMeta({
    layout: "dashboard",
    middleware: 'verify',
    role: 'sAdmin' || 'admin'
  });
  
  const backend = useRuntimeConfig().public.backendUrl;
  
  const links = [
    {
      label: "Dashboard",
      icon: "i-heroicons-square-3-stack-3d",
    },
    {
      label: "Add Image",
      icon: "i-heroicons-plus-16-solid",
    },
  ];
  
  const fileInput = ref(null);
  let dropzoneFile = ref("");
  const isDragging = ref(false);
  const isCarousel = ref(false);
  const title = ref("");
  const description = ref("");
  const location = ref("");
  const image = ref(null);
  const imagePreview = ref(null);
  const isDisplayingSuccess = ref(false);
  const isLoading = ref(false);
  const error = ref("");
  
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
      image.value = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      dropzoneFile.value = null;
      image.value = null;
      imagePreview.value = null;
    }
  };
  
  const submitNewMemory = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("isCarousel", isCarousel.value);
      formData.append("location", location.value);
      formData.append("description", description.value);
      if (image.value) {
        formData.append("image", image.value);
      }
      const response = await $fetch(`${backend}/gallery`, {
        method: "POST",
        body: formData,
      });
      console.log(response.status);
  
      // console.log("Product uploaded successfully:", response);
      // alert(`"${productName.value}" added successfully!`);
      if (response.status == "success") {
      
        isDisplayingSuccess.value = true;
        setTimeout(() => (isDisplayingSuccess.value = false), 5000);
      
      }
  
      //reset form fields
      title.value = "";
      description.value = "";
      isCarousel.value = false
      location.value = "",
      image.value = null;
      dropzoneFile.value = null;
      imagePreview.value = null;
    } catch (error) {
      console.error("Error uploading product:", error);
      error.value = "Failed to add product. Please try again.";
    }
  };
  </script>
  