<template>
  <div class="">
    <div
      class="flex lg:flex-row flex-col gap-10 justify-center items-center lg:px-72 p-4"
    >
      <img
        :src="`${backend + product.productImage}`"
        :alt="product.productName"
        class="lg:w-1/2 w-full h-[300px] lg:h-[500px] rounded-lg object-cover shadow-3xl"
      />
      <div class="bg-white p-10 lg:w-1/2 w-full shadow-xl">
        <p class="text-teal-700">{{ product.category }}</p>
        <h2 class="text-4xl my-4 font-bold">{{ product.productName }}</h2>
        <p class="text-xl my-7 max-w-xl">
          {{ product.description }}
        </p>
        <div>
          <p>5 star rating</p>
        </div>
        <div class="flex gap-4 items-end my-3">
          <p class="font-bold text-4xl text-teal-700">{{ product.price }}</p>
          <p class="font-medium text-2xl text-gray-400">{{ product.offer }}</p>
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
  </div>
</template>

<script setup>
import jwtDecode from "jwt-decode"

const { product } = defineProps(["product"]);
const {token} = useAuthState()
const {status} = useAuth()
const decoded = jwtDecode(token.value)

const backend = useRuntimeConfig().public.backendUrl;
const payKey = useRuntimeConfig().public.paystackPK;

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
        let message = "Payment complete!"
        alert(message);
        resolve(response.reference);
      },
    });
    
    handler.openIframe();
  });
}

// console.log(status);
async function processPayment() {
  if(status.value !== "authenticated"){
    return alert("you must be logged in to make purchase")
  }
  try {
    const  reference = await payWithPaystack();
    await $fetch(`${backend}/order`, {
      method: "POST",
      body: {productId: product._id, reference},
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
