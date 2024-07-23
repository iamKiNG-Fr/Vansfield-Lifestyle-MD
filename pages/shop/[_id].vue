<template>
  <UBreadcrumb :links="links" class="m-10 ml-16" />
  <div v-if="product">
    <ProductDetails :product="product" />
    <!-- <div class="lg:py-24 lg:px-52 md:py-15 md:px-15 p-10">
      <div class="">
        <h3 class="font-bold text-3xl">+ Other Products</h3>
        <p class="italic mb-10">Enrich your Lifestyle</p>
        <div class="productscard">
          <div v-for="product in product" :key="product._id">
            <ProductCard :product="product" />
            {{ product.productName }}
          </div>
        </div>
      </div>
    </div> -->
    <Newsletter />
  </div>
  <div v-else> 
    <p>Loading...</p>
  </div>
</template>

<script setup>
definePageMeta({
  auth: false
});

// useHead({
//   title: `Vansfield Shop`,
//   meta: [{ name: "description", content: "Vansfield Shop" }],
// });

const { _id } = useRoute().params;
const backend = useRuntimeConfig().public.backendUrl;

const product = ref(null);
const products = ref([]);
const links = ref([])



watch(product, (newProduct) => {
  if (newProduct) {
    useHead({
      title: `Vansfield Shop | ${newProduct.productName}`,
      meta: [{ name: "description", content: "Vansfield Shop" }],
    });
  }
});

onMounted( async() => {
  try {
    const productData = await $fetch(`${backend}/products/${_id}`);
    product.value = productData
    console.log("product", product.value.productName);
    links.value = [
      {
        label: "Home",
        icon: "i-heroicons-home-16-solid",
      },
      {
        label: "Shop",
        icon: "i-heroicons-shopping-cart-20-solid",
      },
      {
        label: `${product.value.productName}`
      }
    ];
    
    const { data: productsData } = await useFetch(`${backend}/products`, {
      method: "GET",
      key: _id,
    });
    products.value = productsData
    // console.log("productsssss", products.value);

  } catch (error) {
    console.log(error);
  }
})

</script>

<style scoped></style>
