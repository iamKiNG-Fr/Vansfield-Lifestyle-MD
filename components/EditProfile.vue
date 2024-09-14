<template>
  <div class="w-full backdrop-blur-sm h-screen fixed top-0 left-0 z-10 flex items-center">
    
    <div class="flex flex-col gap-5 bg-gray-50 p-10 rounded-2xl max-w-2xl m-auto shadow-2xl">
      <div class="flex justify-between items-center">
        <p class="font-bold text-3xl text-teal-700">
          Register -
          <span class="font-bold text-xl text-teal-700 mb-7">Basic Details</span>
        </p>
        <UIcon name="material-symbols:close-rounded" class="text-2xl hover:text-red-400" @click="$emit('close-edit-profile')" dynamic/>
      </div> 
  
      <div class="flex flex-wrap gap-5">
        <div class="flex flex-col">
          <label for="" class="font-bold text-lg">First Name</label>
          <input
            type="text"
            placeholder="Enter your First Name"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            v-model="formData.firstName"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="font-bold text-lg">Last Name</label>
          <input
            type="text"
            placeholder="Enter your Last Name"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            v-model="formData.lastName"
            required
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-5">
        <div class="flex flex-col">
          <label for="" class="font-bold text-lg">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            v-model="formData.email"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="font-bold text-lg">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            v-model="formData.phoneNumber"
            required
          />
        </div>
      </div>
  
      <button
        @click="updateDetails"
        :disabled="isLoading === true"
        class="btn2 w-full p-3 text-lg mt-7"
      >
        <p v-if="!isLoading">Update</p>
        <UIcon
          class="animate-spin"
          name="heroicons:arrow-path-16-solid"
          dynamic
          v-else
        />
      </button>
    </div>
  </div>
</template>

<script setup>

const isLoading = ref(false);
const formData = ref({firstName: '', lastName: '', email: '', phone: '', userId: ''})

const {data} = useAuthState()

const user = data.value

onMounted(() => {
    if (user) {
    formData.value.firstName = user.firstName || '';
    formData.value.lastName = user.lastName || '';
    formData.value.email = user.email || '';
    formData.value.phoneNumber = user.phoneNumber || '';
    formData.value.userId = user._id || '';
  }
})

const backend = useRuntimeConfig().public.backendUrl;

const updateDetails = async () => {
  isLoading.value = true;
  
  try {
    const response = await $fetch(`${backend}/user/edit`, {
      method: 'PUT',
      body: formData.value,
    });

    console.log(response);
  } catch (error) {
    console.error('Update failed:', error);
  } finally {
    isLoading.value = false;
  }
};

</script>
