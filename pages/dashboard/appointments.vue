<template>
  <UBreadcrumb :links="links" class="mb-5" />
  <div>
    <h2 class="font-bold text-teal-700 text-2xl mb-8">Appointments</h2>
    <div v-if="formattedAppointments">
      <UTable
        
        :rows="formattedAppointments"
        :columns="columns"
        :ui="{
          strategy: 'override',
          thead: 'mb-[50px]',
          th: { color: 'text-gray-100', base: 'bg-teal-700' },
          td: { base: 'text-center', color: 'text-gray-900', font: 'text-lg' },
          tbody: 'bg-gray-100',
          emptyState: {
            label: 'text-gray-900',
          },
        }"
      >
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="black"
              variant="outline"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
    <div v-else>
      <p>Loading...</p>
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

const backend = useRuntimeConfig().public.backendUrl;

const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "Appointments",
    icon: "i-heroicons-calendar-days-16-solid",
  },
];

const columns = [
  {
    key: "firstName",
    label: "First Name",
  },
  {
    key: "lastName",
    label: "Last Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Phone Number",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "timeFrom",
    label: "Time From",
  },
  {
    key: "timeTo",
    label: "Time To",
  },
  {
    key: "actions",
    label: "Action",
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const { token } = useAuthState();

const formattedAppointments = ref([]);

// Function to format the date
function formatAppointmentDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

onMounted(async () => {
  try {
    const appointments = await $fetch(`${backend}/appointments`, {
      method: "GET",
      credentials: "include",
      headers: token.value ? { Authorization: token.value } : {},
    });

    // Computed property to format the date in appointments
    const formattedAppointmentsData = computed(() => {
      return appointments.map((appointment) => ({
        ...appointment,
        date: formatAppointmentDate(appointment.date), // Format the date field
      }));
    });

    formattedAppointments.value = formattedAppointmentsData.value;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped></style>
