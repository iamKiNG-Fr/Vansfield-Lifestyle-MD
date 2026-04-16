<template>
  <DeletePopup
    v-if="isDisplayingDelete"
    :productName="productNameToPass"
    :id="productIdToPass"
    :isDeleting="isDeleting"
    @removeDeletePopup="isDisplayingDelete = false"
    @deleteProduct="deleteProduct"
  />

  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
          Dashboard / Catalog
        </p>
        <p class="section-kicker mt-2">Catalog Overview</p>
        <h2 class="mt-3 text-2xl font-bold text-teal-700">View Plans and Products</h2>
      </div>
      <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">
        {{ products.length }} items
      </div>
    </div>

    <div v-if="isLoading" class="table-shell p-6 text-sm text-gray-500">
      Loading plans and products...
    </div>

    <div
      v-else-if="products.length === 0"
      class="table-shell p-8 text-center text-gray-500"
    >
      No items found.
    </div>

    <div v-else class="space-y-5">
      <div class="grid gap-4 xl:hidden">
        <article
          v-for="product in paginatedProducts"
          :key="product._id"
          class="table-shell overflow-hidden"
        >
          <div class="grid gap-5 p-5 md:grid-cols-[180px_minmax(0,1fr)]">
            <NuxtImg
              :src="backend + product.productImage"
              :alt="product.productName"
              class="h-44 w-full rounded-[24px] object-cover"
              format="webp"
            />
            <div>
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span class="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {{ product.category }}
                  </span>
                  <p class="mt-3 text-xl font-bold text-gray-900">{{ product.productName }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-teal-700">{{ formatCurrency(product.price) }}</p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ Number(product.offer) > 0 ? `${formatCurrency(product.offer)} off` : "No discount" }}
                  </p>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-2">
                <button class="btn2 !rounded-full" @click="navigateTo(`/dashboard/editproduct/${product._id}`)">
                  Edit
                </button>
                <button class="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-stone-200" @click="navigateTo(`/shop/${product._id}`)">
                  View
                </button>
                <button
                  class="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  @click="promptDelete(product)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="table-shell hidden overflow-x-auto xl:block">
        <table class="min-w-full">
          <thead class="bg-teal-700 text-left text-xs uppercase tracking-[0.16em] text-white">
            <tr>
              <th class="px-5 py-4">Image</th>
              <th class="px-5 py-4">Plan Name</th>
              <th class="px-5 py-4">Category</th>
              <th class="px-5 py-4">Price</th>
              <th class="px-5 py-4">Offer</th>
              <th class="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 bg-white">
            <tr v-for="product in paginatedProducts" :key="product._id">
              <td class="px-5 py-4">
                <NuxtImg
                  :src="backend + product.productImage"
                  :alt="product.productName"
                  width="112"
                  class="h-16 w-16 rounded-2xl object-cover ring-4 ring-stone-50"
                  format="webp"
                />
              </td>
              <td class="px-5 py-4 font-semibold text-gray-900">{{ product.productName }}</td>
              <td class="px-5 py-4">
                <span class="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold text-gray-700 whitespace-nowrap">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ formatCurrency(product.price) }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">
                {{ Number(product.offer) > 0 ? formatCurrency(product.offer) : "No discount" }}
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <button class="flex h-10 w-10 items-center justify-center rounded-full border border-teal-700 bg-white text-base font-semibold text-teal-700 transition hover:bg-teal-700 hover:text-white" title="Edit plan" @click="navigateTo(`/dashboard/editproduct/${product._id}`)">
                    ✎
                  </button>
                  <button class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-base font-semibold text-gray-700 transition hover:bg-stone-200" title="View plan" @click="navigateTo(`/shop/${product._id}`)">
                    ↗
                  </button>
                  <button class="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-base font-semibold text-red-700 transition hover:bg-red-100" title="Delete plan" @click="promptDelete(product)">
                    ×
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdminPagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :total-items="products.length"
        :total-pages="totalPages"
        item-label="items"
      />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "verify",
  role: "sAdmin" || "admin",
});

const isDisplayingDelete = ref(false);
const productNameToPass = ref("");
const productIdToPass = ref("");

const backend = useRuntimeConfig().public.backendUrl;
const { token } = useAuthState();
const products = ref([]);
const isDeleting = ref(false);
const isLoading = ref(true);
const currentPage = ref(1);
const pageSize = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(products.value.length / pageSize))
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return products.value.slice(start, start + pageSize);
});

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const data = await $fetch(`${backend}/products`, {
      method: "GET",
      headers: token.value ? { Authorization: token.value } : {},
    });
    products.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const promptDelete = (product) => {
  isDisplayingDelete.value = true;
  productNameToPass.value = product.productName;
  productIdToPass.value = product._id;
};

const deleteProduct = async (id) => {
  try {
    isDeleting.value = true;
    await $fetch(`${backend}/products/${id}`, { method: "DELETE" });
    products.value = products.value.filter((product) => product._id !== id);
  } catch (error) {
    console.error("Error deleting product:", error);
  } finally {
    isDisplayingDelete.value = false;
    isDeleting.value = false;
  }
};

onMounted(fetchProducts);

watch(
  () => totalPages.value,
  (value) => {
    if (currentPage.value > value) {
      currentPage.value = value;
    }
  }
);
</script>
