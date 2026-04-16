<template>
  <div class="card group">
    <div class="relative overflow-hidden rounded-[24px] bg-stone-100">
      <NuxtImg
        :src="backend + product.productImage"
        :alt="product.productName"
        class="h-52 w-full bg-slate-500 object-cover transition duration-500 group-hover:scale-105"
        placeholder
      />
      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/35 to-transparent"></div>
      <div class="absolute left-4 top-4">
        <span class="rounded-full bg-amber-50/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)] ring-1 ring-white/70">
          {{ product.category }}
        </span>
      </div>
    </div>
    <div class="p-5">
      <p class="text-sm font-medium text-gray-500">{{ cardLabel }}</p>
      <p class="mt-2 text-2xl font-bold leading-snug text-gray-900">
        {{ product.productName }}
      </p>
      <div class="mt-3 flex items-end gap-2">
        <p class="text-2xl font-bold text-teal-700">
          {{ formattedPrice }}
        </p>
        <p class="text-sm font-medium text-gray-400 line-through" v-show="showMainPrice">
          {{ formattedOriginalPrice }}
        </p>
      </div>
      <p class="mt-3 text-sm leading-7 text-gray-500">
        {{ shortDescription }}
      </p>
      <NuxtLink :to="`/shop/${product._id}`"
        ><p class="btn2 mt-5 w-full">View Plan</p></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
const backend = useRuntimeConfig().public.backendUrl;
const showMainPrice = computed(() => product.offer > 0);

const calculatedPrice = computed(() => {
  const productPrice = parseFloat(product.price) || 0;
  const productOffer = parseFloat(product.offer) || 0;
  return productPrice - productOffer;
});

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formattedPrice = computed(() => formatCurrency(calculatedPrice.value));
const formattedOriginalPrice = computed(() => formatCurrency(product.price));
const cardLabel = computed(() => {
  const categoryName = `${product.category || ""}`.trim();
  if (!categoryName) return "Plan";
  return categoryName.endsWith("s") ? categoryName.slice(0, -1) : categoryName;
});
const shortDescription = computed(() => {
  const plainText = `${product.description || ""}`.replace(/<[^>]+>/g, "").trim();
  if (plainText.length <= 88) return plainText;
  return `${plainText.slice(0, 85)}...`;
});
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
