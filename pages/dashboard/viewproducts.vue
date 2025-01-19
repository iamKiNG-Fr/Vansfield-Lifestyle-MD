<template>
  <UBreadcrumb :links="links" class="mb-5" />
  <DeletePopup
    v-show="isDisplayingDelete"
    :productName="productNameToPass"
    :id="productIdToPass"
    @removeDeletePopup="isDisplayingDelete = false"
    @deleteProduct="deleteProduct"
  />
  <div class="">
    <h2 class="font-bold text-teal-700 text-2xl mb-8">View Products</h2>
    <UTable
      loading
      :rows="rows"
      :ui="{
        strategy: 'override',
        thead: 'mb-[50px]',
        th: { color: 'text-gray-100', base: 'bg-teal-700' },
        td: { base: 'text-center', color: 'text-gray-900', font: 'text-base' },
        tbody: 'bg-gray-100',
        emptyState: {
          label: 'text-gray-900',
        },
      }"
      :columns="[
        { key: 'productImage', label: 'Image' },
        { key: 'productName', label: 'Product Name' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'offer', label: 'Offer' },
        { key: 'actions', label: 'Actions' },
      ]"
    >
      <template #productImage-data="{ row }">
        <NuxtImg
          :src="backend + row.productImage"
          :alt="row.productName"
          width="112"
          class="w-28 h-28 object-cover rounded-xl mx-auto"
          format="webp"
        />
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)" :ui="{}">
          <UButton
            color="black"
            variant="outline"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="products.length"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: 'verify',
  role: 'sAdmin' || 'admin'
  // auth: false
});

const isDisplayingDelete = ref(false);
const productNameToPass = ref("");
const productIdToPass = ref("");

const backend = useRuntimeConfig().public.backendUrl;

const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "View Products",
    icon: "i-heroicons-calendar-days-16-solid",
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(`/dashboard/editproduct/${row._id}`),
    },
    {
      label: "View",
      icon: "i-heroicons-eye-16-solid",
      click: () => navigateTo(`/shop/${row._id}`),
    },
  ],

  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        isDisplayingDelete.value = true;
        productNameToPass.value = row.productName;
        productIdToPass.value = row._id;
      },
    },
  ],
];

const { token } = useAuthState();
const page = ref(1);
const pageCount = 5;
const products = ref([]);

const fetchProducts = async () => {
  try {
    const data = await $fetch(`${backend}/products`, {
      method: "get",
      headers: token.value ? { Authorization: token.value } : {},
    });
    products.value = data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    await $fetch(`${backend}/products/${id}`, { method: "DELETE" });
    products.value = products.value.filter((product) => product._id !== id);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
  isDisplayingDelete.value = false;
};

const rows = computed(() => {
  return products.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

onMounted(() => {
  fetchProducts();
});
</script>

<style lang="scss" scoped></style>
