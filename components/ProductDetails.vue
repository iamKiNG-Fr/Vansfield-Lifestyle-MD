<template>
  <div class="">
    <div
      class="flex lg:flex-row flex-col gap-4 justify-center lg:px-28 p-4"
    >
      <div class="lg:w-1/2 md:sticky top-4 h-max">
        <img
          :src="`${backend + product.productImage}`"
          :alt="product.productName"
          class=" h-[300px] lg:h-[450px] rounded-lg object-cover w-full shadow-xl"
        />
        <div class="bg-white px-10 py-10 pt-4 -mt-2 sticky">
          <p class="text-teal-700">{{ product.category }}</p>
          <div class="md:flex justify-between">
            <h2 class="text-2xl sm:text-4xl my-4 font-bold">{{ product.productName }}</h2>
            <div class="flex gap-2 items-end my-3">
              <p class="font-bold sm:text-4xl text-2xl text-teal-700">₦{{ product.price }}</p>
              <p class="font-medium sm:text-2xl text-lg text-gray-400 line-through">
                ₦{{ product.offer }}
              </p>
            </div>
          </div>
          <div>
            <p>5 star rating</p>
          </div>
          <button
            @click="processPayment()"
            class="btn2 p-2 w-full text-xl flex justify-center items-center gap-2"
          >
            <UIcon name="i-heroicons-shopping-cart-solid" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
      <div class="lg:w-1/2 w-full shadow-xl mt-2 md:m-0">
          <div class="bg-white p-10 max-w-full w-full shadow-xl rounded-lg">
            <h2 class="text-2xl font-semibold text-teal-700">Description</h2>
            <p class="md:text-xl text-base my-7 prose" v-html="`${product.description}`"></p>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import jwtDecode from "jwt-decode";

const { product } = defineProps(["product"]);
const { token } = useAuthState();
const { status } = useAuth();

const backend = useRuntimeConfig().public.backendUrl;
const payKey = useRuntimeConfig().public.paystackPK;

let decoded = null;

// Only decode the token if it exists and is valid
if (token.value && token.value !== "null" && token.value !== "") {
  try {
    decoded = jwtDecode(token.value);
  } catch (err) {
    console.error("Error decoding token:", err);
  }
}

useHead({
  script: [
    {
      src: "https://js.paystack.co/v1/inline.js",
      type: "text/javascript",
      defer: true,
    },
  ],
});

function payWithPaystack() {
  return new Promise((resolve, reject) => {
    console.log("heyy");
    let handler = PaystackPop.setup({
      key: payKey, // Replace with your public key
      email: decoded.email,
      amount: (product.price - product.offer) * 100,
      currency: "NGN",
      onClose: function () {
        alert("Window closed.");
        reject("Payment window closed");
      },
      callback: function (response) {
        let message = "Payment complete!";
        alert(message);
        resolve(response.reference);
      },
    });

    handler.openIframe();
  });
}

// console.log(status);
async function processPayment() {
  if (status.value !== "authenticated") {
    return alert("you must be logged in to make purchase");
  }
  try {
    const reference = await payWithPaystack();
    await $fetch(`${backend}/order`, {
      method: "POST",
      body: { productId: product._id, reference },
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });
  } catch (error) {
    console.error(error);
  }
}

// processPayment();
</script>

<style scoped></style>
