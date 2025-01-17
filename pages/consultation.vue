<template>
  <div>
    <div
      @submit.prevent="submitAppointment"
      class="flex justify-center items-center lg:my-[60px]"
    >
      <div class="relative inline-block lg:pl-[440px]">
        <div
          class="lg:bg-[url('/consultlg.jpg')] bg-[url('/consult.jpg')] bg-cover rounded-xl lg:w-[900px] lg:h-[700px] lg:absolute relative -z-10 lg:-right-[30px] lg:-top-8 text-center text-gray-100 p-4 m-8 py-12"
        >
          <div class="lg:hidden">
            <h2 class="font-bold text-3xl mb-3 text-yellow-500">
              Online Consultation Form
            </h2>
            <p>
              Welcome to Vansfield Lifestyle, Dr. Dozie's online consultation
              service. Please fill out the form below so Dr. Dozie can assist
              you promptly and effectively.
            </p>
          </div>
        </div>
        <form
          action=""
          class="p-10 bg-white mt-10 lg:inline-block rounded-xl shadow-lg m-8"
        >
          <div class="flex flex-col">
            <label for="" class="font-bold text-lg">First Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              v-model="formState.firstName"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            />
          </div>
          <div class="flex flex-col pt-8">
            <label for="" class="font-bold text-lg">Last Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              v-model="formState.lastName"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            />
          </div>
          <div class="flex flex-col pt-8">
            <label for="" class="font-bold text-lg">Phone Number</label>
            <input
              type="tel"
              placeholder="enter your phone number"
              v-model="formState.phone"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            />
          </div>
          <div class="flex flex-col pt-8">
            <label for="" class="font-bold text-lg">Email</label>
            <input
              type="email"
              placeholder="enter your email"
              v-model="formState.email"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            />
          </div>
          <!-- <div class="flex flex-col pt-8">
            <label for="" class="font-bold text-lg">Consultation Type</label>
            <select
              name=""
              id=""
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            >
              <option value="" disabled selected>Pick a type</option>
              <option value="">we</option>
              <option value="">llo</option>
              <option value="">mate</option>
            </select>
          </div> -->
          <div class="flex flex-col pt-8">
            <label for="" class="font-bold text-lg">Date</label>
            <input
              type="date"
              :min="minDate"
              v-model="formState.date"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
            />
          </div>
          <div class="flex flex-col ">
            <p class="text-sm text-gray-500 itali pt-8">
                  Available <span class="text-teal-700">Monday</span> to <span class="text-teal-700">Friday</span>  , <span class="text-teal-700">9AM</span> to <span class="text-teal-700">5PM</span>
                
                </p>
                <div class="flex gap-10">

                  <div class="flex flex-col pt-4">
                    <label for="" class="font-bold text-lg">From</label>
                    <input
                      type="time"
                      v-model="formState.timeFrom"
                      :min="minTime"
                      :max="maxTime"
                      step="1800"
                      class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                    />
                  </div>
                  <div class="flex flex-col pt-4">
                  
                    <label for="" class="font-bold text-lg">To</label>
                    <input
                      type="time"
                      v-model="formState.timeTo"
                      :min="minTime"
                      :max="maxTime"
                      step="1800"
                      class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                    />
                  </div>
                </div>
          </div>
          <div class="flex flex-col">
            <label for="details" class="font-bold text-lg mt-8"
              >Talk to us</label
            >
            <textarea
              v-model="formState.details"
              id="details"
              rows="3"
              class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg resize-none"
            ></textarea>
          </div>

          <button type="submit" class="btn2 w-full p-3 text-lg mt-7">
            Book Now
          </button>
        </form>
      </div>
    </div>
    <Newsletter />
  </div>
</template>

<script setup>
useHead({
  title: "Vansfield Lifestyle MD | Consultation",
  meta: [
    {
      name: "description",
      content:
        "Embark on a transformative journey with Dr. Dozie. Discover personalized health plans, expert consultations, and vibrant living strategies. Your path to wellness begins here!",
    },
  ],
});

definePageMeta({
  auth: false,
});

const formState = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  type: "",
  date: "",
  timeFrom: "",
  timeTo: "",
  details: "",
});

// Get today's date in the format YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

// Define the min date and min/max times
const minDate = today;
const minTime = "09:00";
const maxTime = "17:00";

const backend = useRuntimeConfig().public.backendUrl;

const submitAppointment = async () => {
  try {
    await $fetch(`${backend}/appointments`, {
      method: "POST",
      body: formState.value,
    });
    alert("Appointment submitted successfully!");
    formState.value = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      type: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      details: "",
    };
  } catch (error) {
    console.error("Error submitting appointment:", error);
  }
};
</script>
