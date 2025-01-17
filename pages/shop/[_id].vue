<template>
  <UBreadcrumb :links="links" class="m-10 ml-16" />
  <div v-if="product">
    <ProductDetails :product="product" />
    <Newsletter />
  </div>
  <div v-else> 
    <UIcon name="svg-spinners:12-dots-scale-rotate" class=" text-teal-800 text-5xl" dynamic />
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

const product = ref();  
const products = ref([]);
const links = ref([])

const { token } = useAuthState();

watch(product, (newProduct) => {
  if (newProduct) {
    useHead({
      title: `Vansfield Shop | ${newProduct.productName}`,
      meta: [{ name: "description", content: "Vansfield Shop" }],
    });
  }
});

// const { data: productsData } = await useFetch(`${backend}/products`, {
//   method: "GET",
//   key: _id,
// });
// products.value = productsData

onMounted( async() => {
  try {
    const productData = await $fetch(`${backend}/products/${_id}`, {
      method: "GET",
      // headers: token.value ? { Authorization: token.value } : {}
    });
    product.value = productData

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
    
    // console.log("productsssss", products.value);

  } catch (error) {
    console.log(error);
  }
})

</script>

<style scoped></style>
