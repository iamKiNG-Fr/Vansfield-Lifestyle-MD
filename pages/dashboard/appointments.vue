<template>
  <AppointmentDetails
    v-if="showAppointmentDetail"
    @closeAppointmentDetail="showAppointmentDetail = false"
    :appointmentDetail="appointmentDetail"
  />
  <DeletePopup
    v-if="showDeletepopup"
    :productName="`${deleteInfo.firstName}'s Consultation`"
    :id="deleteInfo._id"
    :isDeleting="isDeleting"
    @removeDeletePopup="showDeletepopup = false"
    @deleteProduct="deleteConsultaion"
  />

  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 shadow-sm ring-1 ring-teal-100">
          Dashboard / Appointments
        </p>
        <p class="section-kicker mt-2">Schedule Overview</p>
        <h2 class="mt-3 text-2xl font-bold text-teal-700">Appointments</h2>
      </div>
      <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">
        {{ formattedAppointments.length }} appointments
      </div>
    </div>

    <div v-if="isLoading" class="table-shell p-6 text-sm text-gray-500">
      Loading appointments...
    </div>

    <div
      v-else-if="formattedAppointments.length === 0"
      class="table-shell p-8 text-center text-gray-500"
    >
      No appointments yet.
    </div>

    <div v-else class="space-y-5">
      <div class="grid gap-4 xl:hidden">
        <article
          v-for="appointment in paginatedAppointments"
          :key="appointment._id"
          class="table-shell p-5"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-lg font-bold text-gray-900">
                {{ appointment.firstName }} {{ appointment.lastName }}
              </p>
              <p class="mt-1 text-sm text-gray-500">{{ appointment.email }}</p>
            </div>
            <span class="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {{ appointment.date }}
            </span>
          </div>

          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl bg-stone-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                Phone
              </p>
              <p class="mt-2 text-sm font-medium text-gray-800">{{ appointment.phone }}</p>
            </div>
            <div class="rounded-2xl bg-stone-50 px-4 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                Time
              </p>
              <p class="mt-2 text-sm font-medium text-gray-800">
                {{ appointment.timeFrom }} - {{ appointment.timeTo }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-3">
            <button class="btn2" @click="openAppointment(appointment)">View</button>
            <button class="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100" @click="promptDelete(appointment)">
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
              <th class="px-5 py-4">Email</th>
              <th class="px-5 py-4">Phone</th>
              <th class="px-5 py-4">Date</th>
              <th class="px-5 py-4">Time</th>
              <th class="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 bg-white">
            <tr v-for="appointment in paginatedAppointments" :key="appointment._id">
              <td class="px-5 py-4 font-semibold text-gray-900">
                {{ appointment.firstName }} {{ appointment.lastName }}
              </td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ appointment.email }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ appointment.phone }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ appointment.date }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">
                {{ appointment.timeFrom }} - {{ appointment.timeTo }}
              </td>
              <td class="px-5 py-4">
                <div class="flex flex-wrap gap-2">
                  <button class="btn2 !px-3 !py-2 !text-sm" @click="openAppointment(appointment)">
                    View
                  </button>
                  <button class="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100" @click="promptDelete(appointment)">
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
        :total-items="formattedAppointments.length"
        :total-pages="totalPages"
        item-label="appointments"
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

const showAppointmentDetail = ref(false);
const appointmentDetail = ref(null);
const backend = useRuntimeConfig().public.backendUrl;
const showDeletepopup = ref(false);
const deleteInfo = ref(null);
const isLoading = ref(true);
const isDeleting = ref(false);
const { token } = useAuthState();

const formattedAppointments = ref([]);
const currentPage = ref(1);
const pageSize = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(formattedAppointments.value.length / pageSize))
);

const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return formattedAppointments.value.slice(start, start + pageSize);
});

function formatAppointmentDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const openAppointment = (appointment) => {
  appointmentDetail.value = appointment;
  showAppointmentDetail.value = true;
};

const promptDelete = (appointment) => {
  deleteInfo.value = appointment;
  showDeletepopup.value = true;
};

const deleteConsultaion = async (id) => {
  try {
    isDeleting.value = true;
    const response = await $fetch(`${backend}/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });
    if (response.success) {
      formattedAppointments.value = formattedAppointments.value.filter(
        (appointment) => appointment._id !== id
      );
      showDeletepopup.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isDeleting.value = false;
  }
};

const fetchAppointments = async () => {
  try {
    isLoading.value = true;
    const appointments = await $fetch(`${backend}/appointments`, {
      method: "GET",
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });

    formattedAppointments.value = appointments.map((appointment) => ({
      ...appointment,
      date: formatAppointmentDate(appointment.date),
    }));
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAppointments);

watch(
  () => totalPages.value,
  (value) => {
    if (currentPage.value > value) {
      currentPage.value = value;
    }
  }
);
</script>
