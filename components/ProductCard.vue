<template>
  <div class="card">
    <NuxtImg
      :src="backend + product.productImage"
      :alt="product.productName"
      class="w-full h-40 lg:h-56 max-[690px]:h-56 bg-slate-500 object-cover"
      placeholder
    />
    <div class="p-4">
      <p class="mt-1">{{ product.category }}</p>
      <p class="text-xl font-bold mt-1">{{ product.productName }}</p>
      <div class="flex my-1">
        <p class="font-bold text-xl mr-2 text-teal-700">
          ₦{{ calculatedPrice }}
        </p>
        <p class="font-medium text-gray-400 line-through" v-show="showMainPrice">
          ₦{{ product.price }}
        </p>
      </div>
      <!-- <p class=" font-normal" v-html="`${truncatedDescription}`"></p> -->
      <NuxtLink :to="`/shop/${product._id}`"
        ><p class="btn2">View Details</p></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
const backend = useRuntimeConfig().public.backendUrl;
const showMainPrice = computed(() => product.offer > 0);

// const price = product.productPrice - product.productOffer

const truncatedDescription = computed(() => {
  return product.description.length > 30
    ? product.description.slice(0, 29) + "..."
    : product.description;
});

const calculatedPrice = computed(() => {
  const productPrice = parseFloat(product.price) || 0;
  const productOffer = parseFloat(product.offer) || 0;
  return productPrice - productOffer;
});

</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
