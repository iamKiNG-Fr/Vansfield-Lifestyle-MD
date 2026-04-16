<template>
  <InterestRequestDetails
    v-if="selectedRequest"
    :request="selectedRequest"
    @close="selectedRequest = null"
  />
  <DeletePopup
    v-if="showDeletePopup"
    :productName="`${requestToDelete?.requesterName}'s request for ${requestToDelete?.productName}`"
    :id="requestToDelete?._id"
    :isDeleting="isDeleting"
    @removeDeletePopup="showDeletePopup = false"
    @deleteProduct="deleteRequest"
  />

  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
          Dashboard / Requests
        </p>
        <p class="section-kicker mt-2">Interest Inbox</p>
        <h2 class="mt-3 text-2xl font-bold text-teal-700">Plan Requests</h2>
      </div>
      <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">
        {{ requests.length }} requests
      </div>
    </div>

    <div v-if="isLoading" class="table-shell p-6 text-sm text-gray-500">
      Loading requests...
    </div>

    <div
      v-else-if="requests.length === 0"
      class="table-shell p-8 text-center text-gray-500"
    >
      No requests yet.
    </div>

    <div v-else class="space-y-5">
      <div class="grid gap-4 xl:hidden">
        <article
          v-for="request in paginatedRequests"
          :key="request._id"
          class="table-shell p-5"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-lg font-bold text-gray-900">{{ request.requesterName }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ request.productName }}</p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
              :class="statusClasses[request.status] || 'bg-gray-200 text-gray-700'"
            >
              {{ request.status }}
            </span>
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl bg-stone-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                Contact
              </p>
              <p class="mt-2 text-sm font-medium text-gray-800">{{ request.email }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ request.phone || "No phone" }}</p>
            </div>
            <div class="rounded-2xl bg-stone-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                Received
              </p>
              <p class="mt-2 text-sm font-medium text-gray-800">
                {{ formatDate(request.createdAt) }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-3">
            <button class="btn2" @click="selectedRequest = request">View</button>
            <button
              v-if="request.status !== 'contacted'"
              class="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              @click="updateStatus(request._id, 'contacted')"
            >
              Mark Contacted
            </button>
            <button
              v-if="request.status !== 'closed'"
              class="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              @click="updateStatus(request._id, 'closed')"
            >
              Mark Closed
            </button>
            <button
              class="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              @click="openDelete(request)"
            >
              Delete
            </button>
          </div>
        </article>
      </div>

      <div class="table-shell hidden overflow-x-auto xl:block">
        <table class="min-w-full">
          <thead class="bg-teal-700 text-left text-xs uppercase tracking-[0.16em] text-white">
            <tr>
              <th class="px-5 py-4">Name</th>
              <th class="px-5 py-4">Plan</th>
              <th class="px-5 py-4">Email</th>
              <th class="px-5 py-4">Phone</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4">Received</th>
              <th class="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 bg-white">
            <tr v-for="request in paginatedRequests" :key="request._id">
              <td class="px-5 py-4 font-semibold text-gray-900">{{ request.requesterName }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ request.productName }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ request.email }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ request.phone || "No phone" }}</td>
              <td class="px-5 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                  :class="statusClasses[request.status] || 'bg-gray-200 text-gray-700'"
                >
                  {{ request.status }}
                </span>
              </td>
              <td class="px-5 py-4 text-sm text-gray-600">
                {{ formatDate(request.createdAt) }}
              </td>
              <td class="px-5 py-4">
                <div class="flex flex-wrap gap-2">
                  <button class="btn2 !px-3 !py-2 !text-sm" @click="selectedRequest = request">
                    View
                  </button>
                  <button
                    v-if="request.status !== 'contacted'"
                    class="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    @click="updateStatus(request._id, 'contacted')"
                  >
                    Contacted
                  </button>
                  <button
                    v-if="request.status !== 'closed'"
                    class="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    @click="updateStatus(request._id, 'closed')"
                  >
                    Closed
                  </button>
                  <button
                    class="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    @click="openDelete(request)"
                  >
                    Delete
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
        :total-items="requests.length"
        :total-pages="totalPages"
        item-label="requests"
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

const backend = useRuntimeConfig().public.backendUrl;
const { token } = useAuthState();

const requests = ref([]);
const selectedRequest = ref(null);
const requestToDelete = ref(null);
const showDeletePopup = ref(false);
const isDeleting = ref(false);
const isLoading = ref(true);
const currentPage = ref(1);
const pageSize = 6;

const statusClasses = {
  new: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  closed: "bg-green-100 text-green-800",
};

const totalPages = computed(() =>
  Math.max(1, Math.ceil(requests.value.length / pageSize))
);

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return requests.value.slice(start, start + pageSize);
});

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fetchRequests = async () => {
  try {
    isLoading.value = true;
    requests.value = await $fetch(`${backend}/requests`, {
      method: "GET",
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const updateStatus = async (id, status) => {
  try {
    const response = await $fetch(`${backend}/requests/${id}/status`, {
      method: "PATCH",
      body: { status },
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });

    requests.value = requests.value.map((request) =>
      request._id === id ? response.request : request
    );

    if (selectedRequest.value?._id === id) {
      selectedRequest.value = response.request;
    }
  } catch (error) {
    console.error(error);
  }
};

const openDelete = (request) => {
  requestToDelete.value = request;
  showDeletePopup.value = true;
};

const deleteRequest = async (id) => {
  try {
    isDeleting.value = true;
    await $fetch(`${backend}/requests/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });
    requests.value = requests.value.filter((request) => request._id !== id);
    if (selectedRequest.value?._id === id) {
      selectedRequest.value = null;
    }
    showDeletePopup.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchRequests);

watch(
  () => totalPages.value,
  (value) => {
    if (currentPage.value > value) {
      currentPage.value = value;
    }
  }
);
</script>
