<template>
  <div
    class="w-screen backdrop-blur-sm bg-gray-900 bg-opacity-20 inset-0 h-screen fixed flex justify-center items-center z-30"
  >
    <div
      class="flex gap-2 max-md:flex-col mx-7 bg-gray-100 w-[500px]  h-auto rounded-xl overflow-hidden shadow-xl relative"
    >
      <UIcon
        name="material-symbols:close-rounded"
        class="text-3xl hover:text-red-400 z-40 drop-shadow-md self-end absolute top-4 right-4 hidden md:block"
        @click="$emit('closeAppointmentDetail')"
        dynamic
      />
      <div class="p-10 w-full">
        <h2 class="text-2xl font-bold text-teal-700 mb-5">
          Appointment Details
        </h2>
        <div class="flex flex-col gap-3 w-full">
          <div class="flex gap-10 w-full">
            <div class="flex-1">
              <p class="text-md capitalize font-base italic text-gray-500">firstname</p>
              <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.firstName }}</p>
            </div>
            <div class="flex-1">
              <p class="text-md capitalize font-base italic text-gray-500">lastname</p>
              <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.lastName }}</p>
            </div>
          </div>
          <div class="flex gap-10 w-full">
            <div class="flex-1">
                <p class="text-md capitalize font-base italic text-gray-500">Date</p>
                <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.date }}</p>
              </div>
            <div class="flex-1">
              <p class="text-md capitalize font-base italic text-gray-500">From</p>
              <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.timeFrom }}</p>
            </div>
            <div class="flex-1">
              <p class="text-md capitalize font-base italic text-gray-500">To</p>
              <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.timeTo }}</p>
            </div>
          </div>
          <div>
            <p class="text-md capitalize font-base italic text-gray-500">Phone</p>
            <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.phone }}</p>
          </div>
          <div>
            <p class="text-md capitalize font-base italic text-gray-500">email</p>
            <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.email }}</p>
          </div>
          <div v-if="appointmentDetail.details">
            <p class="text-md capitalize font-base italic text-gray-500">More details</p>
            <p class=" border-b-2 border-teal-700 py-1 px-3  text-lg mt-1 rounded-t-md font-semibold ">{{ appointmentDetail.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const backend = useRuntimeConfig().public.backendUrl;
const { appointmentDetail } = defineProps(["appointmentDetail"]);

</script>

<style scoped></style>
