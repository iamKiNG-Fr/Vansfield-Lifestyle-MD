<template>
  <UBreadcrumb :links="links" class="m-10 ml-16" />
  <div v-if="product">
    <ProductDetails :product="product" />
    <Newsletter />
  </div>
  <div v-else>
    <UIcon
      name="svg-spinners:12-dots-scale-rotate"
      class="text-5xl text-teal-800"
      dynamic
    />
  </div>
</template>

<script setup>
definePageMeta({
  auth: false,
});

const { _id } = useRoute().params;
const config = useRuntimeConfig();
const backend = config.public.backendUrl;
const siteUrl = config.public.siteUrl;

const product = ref(null);
const links = ref([]);

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const productTitle = computed(() =>
  product.value?.productName
    ? `${product.value.productName} | Vansfield Lifestyle MD`
    : "Plan Details | Vansfield Lifestyle MD"
);

const productDescription = computed(() => {
  const rawDescription = stripHtml(product.value?.description || "");
  return (
    rawDescription.slice(0, 155) ||
    "Explore this wellness plan from Vansfield Lifestyle MD and send an interest request for follow-up."
  );
});

const productImageUrl = computed(() =>
  product.value?.productImage
    ? `${backend}${product.value.productImage}`
    : `${siteUrl}/assets/img/drdozie4.png`
);

useSeoMeta({
  title: () => productTitle.value,
  description: () => productDescription.value,
  ogTitle: () => productTitle.value,
  ogDescription: () => productDescription.value,
  ogType: "product",
  ogUrl: `${siteUrl}/shop/${_id}`,
  ogImage: () => productImageUrl.value,
  ogImageAlt: () => productTitle.value,
  twitterCard: "summary_large_image",
  twitterTitle: () => productTitle.value,
  twitterDescription: () => productDescription.value,
  twitterImage: () => productImageUrl.value,
});

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/shop/${_id}` }],
});

onMounted(async () => {
  try {
    const productData = await $fetch(`${backend}/products/${_id}`, {
      method: "GET",
    });

    product.value = productData;

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
        label: product.value.productName,
      },
    ];
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
