<template>
  <div>
    <div
      class="bg-teal-700 lg:text-6xl md:text-3xl text-2xl font-bold text-center text-white leading-tight bg-[url('/plant.jpg')] bg-cover md:bg-top bg-left-bottom md:py-24 sm:px-24 md:px-32 py-10 p-14"
    >
      You're one Step <span class="text-yellow-400">Closer to Embracing</span> a
      Lifestyle of <span class="text-yellow-400">Wellness</span>
    </div>
    <UBreadcrumb :links="links" class="m-10 ml-16" />
    <div class="lg:py-0 lg:px-18 2xl:px-24 md:py-0 md:px-15 p-10">
      <div>
        <h3 class="font-bold text-3xl">+ Products</h3>
        <p class="italic">Healthy Lifestyle starts witha good plan</p>
        <div v-if="status==='pending'" class="flex gap-8 mt-10 flex-wrap mx-auto">
          <USkeleton
            v-for="n in 6"
            :key="n"
            class="h-[300px] w-[250px]"
            :ui="{backgound: 'bg-red-400'}"
          />
        </div>
        <div class="productscard mt-10 " v-else>
          <div v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
            <!-- {{ product.productName }} -->
          </div>
        </div>
      </div>
      <!-- <div class="mt-24">
        <h3 class="font-bold text-3xl">+ Products</h3>
        <p class="italic">Enrich your mind</p>
        <div class="productscard"> -->
      <!-- <ProductCard />
          <ProductCard />
          <ProductCard /> -->
      <!-- </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Vansfield Lifestyle | Shop",
  meta: [{ name: "description", content: "Discover a range of valuable resources in the Dr. Dozie Shop, from informative books on health and wellness to personalized diet plans designed to support your unique needs." }],
});

definePageMeta({
  // auth: {
  //   unauthenticatedOnly: true,
  // },
  auth: false,
});

defineOgImageComponent('NuxtSeo'
, {
  colorMode: 'dark',
  theme: '#008080',
  sitelogo: '/favicon.ico'
})


const links = [
  {
    label: "Home",
    icon: "i-heroicons-home-16-solid",
  },
  {
    label: "Shop",
    icon: "i-heroicons-shopping-cart-20-solid",
  },
];

const { token, setToken } = useAuthState();

const backend = useRuntimeConfig().public.backendUrl;

const {status, data: products} = await useLazyFetch(`${backend}/products`, {
  method: "GET",
  credentials: "include",
  headers: token.value ? { Authorization: token.value } : {},
});
</script>

<style scoped></style>
