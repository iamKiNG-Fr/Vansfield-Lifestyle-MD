<template>
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-white/30 px-4 backdrop-blur-[6px]"
    @click.self="$emit('close-edit-profile')"
  >
    <form
      class="w-full max-w-3xl rounded-[30px] border border-white/90 bg-white p-6 shadow-[0_35px_90px_rgba(15,23,42,0.16)] lg:p-8"
      @submit.prevent="updateDetails"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Profile
          </p>
          <h2 class="mt-3 text-3xl font-bold text-gray-900">Edit your details</h2>
          <p class="mt-2 text-sm leading-7 text-gray-500">
            Update the name, email, and phone number shown on your account.
          </p>
        </div>
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-2xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          @click="$emit('close-edit-profile')"
        >
          &times;
        </button>
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <div class="flex flex-col">
          <label class="modern-label">First Name</label>
          <input
            v-model="formData.firstName"
            type="text"
            placeholder="Enter your first name"
            class="modern-input"
            required
          />
        </div>
        <div class="flex flex-col">
          <label class="modern-label">Last Name</label>
          <input
            v-model="formData.lastName"
            type="text"
            placeholder="Enter your last name"
            class="modern-input"
            required
          />
        </div>
        <div class="flex flex-col">
          <label class="modern-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            class="modern-input"
            required
          />
        </div>
        <div class="flex flex-col">
          <label class="modern-label">Phone Number</label>
          <input
            v-model="formData.phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            class="modern-input"
            required
          />
        </div>
      </div>

      <p v-if="feedback" class="mt-5 text-sm font-semibold" :class="feedbackClass">
        {{ feedback }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          :disabled="isLoading"
          class="btn flex-1 justify-center py-3"
        >
          <span v-if="!isLoading">Save Changes</span>
          <span v-else class="animate-pulse">Saving...</span>
        </button>
        <button
          type="button"
          class="flex-1 rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          @click="$emit('close-edit-profile')"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(["close-edit-profile"]);

const isLoading = ref(false);
const feedback = ref("");
const feedbackClass = ref("text-emerald-700");
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  userId: "",
});

const { data } = useAuthState();
const user = computed(() => data.value);
const backend = useRuntimeConfig().public.backendUrl;

onMounted(() => {
  if (!user.value) return;

  formData.value.firstName = user.value.firstName || "";
  formData.value.lastName = user.value.lastName || "";
  formData.value.email = user.value.email || "";
  formData.value.phoneNumber = user.value.phoneNumber || "";
  formData.value.userId = user.value._id || "";
});

const updateDetails = async () => {
  try {
    isLoading.value = true;
    feedback.value = "";

    await $fetch(`${backend}/user/edit`, {
      method: "PUT",
      body: formData.value,
    });

    feedbackClass.value = "text-emerald-700";
    feedback.value = "Profile updated successfully.";

    setTimeout(() => {
      emit("close-edit-profile");
    }, 900);
  } catch (error) {
    console.error("Update failed:", error);
    feedbackClass.value = "text-red-600";
    feedback.value = "Update failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
