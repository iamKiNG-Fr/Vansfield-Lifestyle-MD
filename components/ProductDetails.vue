<template>
  <div class="">
    <div class="flex lg:flex-row flex-col gap-10 justify-center items-center lg:px-72 p-4">
      <img :src="`${backend + product.productImage}`" :alt="product.productName" class="lg:w-1/2 w-full h-[300px] lg:h-[500px] rounded-lg object-cover shadow-3xl" />
      <div class="bg-white p-10 lg:w-1/2 w-full shadow-xl">
        <p class="text-teal-700">{{product.category}}</p>
        <h2 class="text-4xl my-4 font-bold">{{ product.productName}}</h2>
        <p class="text-xl my-7 max-w-xl">
          {{ product.description }}
        </p>
        <div>
          <p>5 star rating</p>
        </div>
        <div class="flex gap-4 items-end my-3">
          <p class="font-bold text-4xl text-teal-700">{{product.price}}</p>
          <p class="font-medium text-2xl text-gray-400">{{product.offer}}</p>
        </div>
        <button @click="processPayment()" class="btn2 p-2 w-full text-xl flex justify-center items-center gap-2">
          <UIcon name="i-heroicons-shopping-cart-solid"/>
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const {product} = defineProps(['product'])

const backend = useRuntimeConfig().public.backendUrl

useHead({
  script: [
    {
      src: 'https://js.paystack.co/v1/inline.js',
      type: 'text/javascript',
      defer: true
    }
  ]
});

function payWithPaystack() {
  return new Promise((resolve, reject) => {
    console.log('heyy');
    let handler = PaystackPop.setup({
      key: 'pk_test_aec22224e9124720e1155f65006f5ff44c6774d6', // Replace with your public key
      email: 'francisking1st@gmail.com',
      amount: product.price * 100,
      currency: 'NGN',
      onClose: function() {
        alert('Window closed.');
        reject('Payment window closed');
      },
      callback: function(response) {
        let message = 'Payment complete! ' + response.reference;
        alert(message);
        resolve(response.reference);
      }
    });

    handler.openIframe();
  });
}

async function processPayment() {
  try {
    let reference = await payWithPaystack();
    console.log('reference');
    console.log(reference);
  } catch (error) {
    console.error(error);
  }
}

// processPayment();

</script>

<style scoped>

</style>
