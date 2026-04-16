<template>
  <div class="">
    <div class="flex lg:flex-row flex-col gap-4 justify-center lg:px-28 p-4">
      <div class="lg:w-1/2 md:sticky top-4 h-max">
        <img
          :src="`${backend + product.productImage}`"
          :alt="product.productName"
          class="h-[300px] lg:h-[450px] rounded-lg object-cover w-full shadow-xl"
        />
        <div class="bg-white px-10 py-10 pt-4 -mt-2 sticky">
          <p class="text-teal-700">{{ product.categoryName }}</p>
          <div class="md:flex justify-between">
            <h2 class="text-2xl sm:text-4xl my-4 font-bold">
              {{ product.productName }}
            </h2>
            <div class="flex gap-2 items-end my-3">
              <p class="font-bold sm:text-4xl text-2xl text-teal-700">
                {{ formattedPrice }}
              </p>
              <p
                v-if="showOfferPrice"
                class="font-medium sm:text-2xl text-lg text-gray-400 line-through"
              >
                {{ formattedOriginalPrice }}
              </p>
            </div>
          </div>
          <div class="text-gray-600">
            <p>
              Interested in this plan? Send a request and the team will contact
              you directly.
            </p>
          </div>
          <form @submit.prevent="submitInterestRequest" class="mt-6 space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="flex flex-col">
                <label for="requesterName" class="font-semibold text-sm mb-1"
                  >Full Name</label
                >
                <input
                  id="requesterName"
                  v-model="requestForm.requesterName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  class="bg-white px-4 py-3 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-base"
                />
              </div>
              <div class="flex flex-col">
                <label for="email" class="font-semibold text-sm mb-1"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="requestForm.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  class="bg-white px-4 py-3 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-base"
                />
              </div>
            </div>
            <div class="flex flex-col">
              <label for="phone" class="font-semibold text-sm mb-1"
                >Phone Number</label
              >
              <input
                id="phone"
                v-model="requestForm.phone"
                type="tel"
                placeholder="Enter your phone number"
                class="bg-white px-4 py-3 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-base"
              />
            </div>
            <div class="flex flex-col">
              <label for="notes" class="font-semibold text-sm mb-1"
                >Message</label
              >
              <textarea
                id="notes"
                v-model="requestForm.notes"
                rows="4"
                placeholder="Add any details or questions about this plan"
                class="bg-white px-4 py-3 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-base resize-none"
              ></textarea>
            </div>
            <p v-if="errorMessage" class="text-red-600 text-sm">
              {{ errorMessage }}
            </p>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn2 p-3 w-full text-xl flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <UIcon
                v-if="isSubmitting"
                class="animate-spin"
                name="heroicons:arrow-path-16-solid"
                dynamic
              />
              <UIcon v-else name="heroicons:paper-airplane-solid" dynamic />
              <span>{{ isSubmitting ? "Sending..." : "Request This Plan" }}</span>
            </button>
          </form>
        </div>
      </div>
      <div class="lg:w-1/2 w-full shadow-xl mt-2 md:m-0">
        <div class="bg-white p-10 max-w-full w-full shadow-xl rounded-lg">
          <h2 class="text-2xl font-semibold text-teal-700">Description</h2>
          <p
            class="md:text-xl text-base my-7 prose"
            v-html="`${product.description}`"
          ></p>
        </div>
      </div>
    </div>
    <SuccessPopup v-if="successMessage" :message="successMessage" @close="successMessage = ''" />
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
const { data } = useAuthState();

const backend = useRuntimeConfig().public.backendUrl;
const user = computed(() => data.value);

const requestForm = ref({
  requesterName: "",
  email: "",
  phone: "",
  notes: "",
});
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

useHead({
  title: `${product.productName} | Vansfield Lifestyle MD Shop`,
  meta: [{ name: "description", content: "Vansfield Shop" }],
});

const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const discountedPrice = computed(() => {
  const price = Number(product.price) || 0;
  const offer = Number(product.offer) || 0;
  return Math.max(price - offer, 0);
});

const showOfferPrice = computed(() => Number(product.offer) > 0);
const formattedPrice = computed(() => formatCurrency(discountedPrice.value));
const formattedOriginalPrice = computed(() => formatCurrency(product.price));

watchEffect(() => {
  if (!user.value) return;

  requestForm.value.requesterName =
    requestForm.value.requesterName ||
    `${user.value.firstName || ""} ${user.value.lastName || ""}`.trim();
  requestForm.value.email = requestForm.value.email || user.value.email || "";
  requestForm.value.phone =
    requestForm.value.phone || user.value.phoneNumber || "";
});

const clearFeedback = () => {
  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 3500);
};

const submitInterestRequest = async () => {
  errorMessage.value = "";

  try {
    isSubmitting.value = true;
    const response = await $fetch(`${backend}/requests`, {
      method: "POST",
      body: {
        productId: product._id,
        requesterName: requestForm.value.requesterName,
        email: requestForm.value.email,
        phone: requestForm.value.phone,
        notes: requestForm.value.notes,
      },
    });

    successMessage.value = response.message;
    requestForm.value.notes = "";
    clearFeedback();
  } catch (error) {
    errorMessage.value =
      error?.data?.message || "Unable to send your request right now.";
    clearFeedback();
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped></style>
