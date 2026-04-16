<template>
  <div class="pb-12">
    <section class="px-4 pt-8 lg:px-20 lg:pt-12">
      <div
        class="mx-auto grid max-w-7xl gap-8 rounded-[36px] bg-[linear-gradient(135deg,#fef3c7_0%,#ffffff_38%,#ecfdf5_100%)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.02fr_0.98fr] lg:p-10"
      >
        <div>
          <p class="section-kicker">Plans And Products</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
            Explore plans and wellness resources.
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-gray-600 lg:text-lg">
            Browse the catalog by category and find a simple starting point.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink to="/consultation" class="btn">Book a Consultation</NuxtLink>
            <div class="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-stone-200">
              {{ productsList.length }} available items
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-[28px] bg-teal-700 p-6 text-white shadow-[0_24px_60px_rgba(13,110,103,0.18)] sm:col-span-2">
            <p class="text-sm uppercase tracking-[0.16em] text-yellow-300">Grouped by category</p>
            <p class="mt-4 text-xl font-bold">Categories with multiple items stay together, while single items are collected into one simple section.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-10 lg:px-20 lg:py-14">
      <div v-if="status === 'pending'" class="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="n in 6"
          :key="n"
          class="h-[360px] animate-pulse rounded-[28px] bg-white shadow-sm ring-1 ring-stone-200"
        ></div>
      </div>

      <div v-else class="mx-auto max-w-7xl space-y-12">
        <section
          v-for="section in groupedSections"
          :key="section.title"
          class="space-y-6"
        >
          <div
            class="rounded-[28px] border border-stone-200 px-6 py-6 shadow-sm"
            :class="section.accent"
          >
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="section-kicker" :class="section.kickerClass">Catalog Group</p>
                <h2 class="mt-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {{ section.title }}
                </h2>
                <p class="mt-3 max-w-3xl text-sm leading-7 text-gray-600 lg:text-base">
                  {{ section.description }}
                </p>
              </div>
              <div class="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-teal-700 ring-1 ring-stone-200">
                {{ section.items.length }} item{{ section.items.length > 1 ? "s" : "" }}
              </div>
            </div>
          </div>

          <div class="productscard">
            <div v-for="product in section.items" :key="product._id">
              <ProductCard :product="product" />
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
const siteUrl = useRuntimeConfig().public.siteUrl;
const pageTitle = "Plans and Products | Vansfield Lifestyle MD";
const pageDescription =
  "Browse wellness plans, health resources, and tailored products from Vansfield Lifestyle MD, grouped clearly by category for easier discovery.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: `${siteUrl}/shop`,
  ogImage: `${siteUrl}/assets/img/VLMD-health-insurance-hospital-medical-care-concept.png`,
  ogImageAlt: "Plans and products from Vansfield Lifestyle MD",
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}/assets/img/VLMD-health-insurance-hospital-medical-care-concept.png`,
});

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/shop` }],
});

definePageMeta({
  auth: false,
});

defineOgImageComponent("NuxtSeo", {
  colorMode: "dark",
  theme: "#008080",
  sitelogo: "/favicon.ico",
});

const { token } = useAuthState();
const backend = useRuntimeConfig().public.backendUrl;

const { status, data: products } = await useLazyFetch(`${backend}/products`, {
  method: "GET",
  credentials: "include",
  headers: token.value ? { Authorization: token.value } : {},
});

const productsList = computed(() => products.value || []);

const groupedSections = computed(() => {
  const grouped = new Map();

  for (const product of productsList.value) {
    const category = product.category || "General";
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category).push(product);
  }

  const categorySections = [];
  const singleItems = [];

  [...grouped.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([category, items]) => {
      if (items.length > 1) {
        categorySections.push({
          title: category,
          items,
          description: `A focused collection of ${items.length} items in ${category.toLowerCase()}.`,
          accent: "bg-teal-50",
          kickerClass: "!text-teal-700",
        });
      } else {
        singleItems.push(items[0]);
      }
    });

  if (singleItems.length) {
    categorySections.push({
      title: "Special Selections",
      items: singleItems,
      description:
        "Standalone plans and one-off resources collected into one simple section.",
      accent: "bg-amber-50",
      kickerClass: "!text-amber-700",
    });
  }

  return categorySections;
});
</script>
