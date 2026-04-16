<template>
  <div class="px-4 py-8 lg:px-20 lg:py-12">
    <section
      class="mx-auto grid max-w-7xl gap-8 rounded-[36px] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.92fr_1.08fr] lg:p-10"
    >
      <div class="rounded-[32px] bg-teal-700 p-8 text-white">
        <p class="section-kicker !text-yellow-300">Consultation Booking</p>
        <h1 class="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
          Book a focused consultation with Dr. Dozie
        </h1>
        <p class="mt-6 text-base leading-8 text-teal-50/90 lg:text-lg">
          Share a few details about your needs and preferred time, and the team
          will follow up to confirm availability.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-[24px] bg-white/10 p-5">
            <p class="text-sm uppercase tracking-[0.14em] text-yellow-300">Availability</p>
            <p class="mt-3 text-sm leading-7 text-teal-50/85">
              Monday to Friday, 9:00 AM to 5:00 PM.
            </p>
          </div>
          <div class="rounded-[24px] bg-white/10 p-5">
            <p class="text-sm uppercase tracking-[0.14em] text-yellow-300">Format</p>
            <p class="mt-3 text-sm leading-7 text-teal-50/85">
              Designed for practical conversations, next steps, and follow-up support.
            </p>
          </div>
        </div>

        <div class="mt-8 rounded-[28px] border border-white/10 bg-white/8 p-6">
          <p class="text-sm uppercase tracking-[0.14em] text-yellow-300">What to expect</p>
          <div class="mt-4 grid gap-3">
            <div class="rounded-2xl bg-white/10 px-4 py-3 text-sm text-teal-50/90">
              A clear review of your concern or goal.
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-3 text-sm text-teal-50/90">
              Practical recommendations and next-step guidance.
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-3 text-sm text-teal-50/90">
              Follow-up confirmation by email after submission.
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitAppointment" class="rounded-[32px] border border-stone-200 bg-stone-50/70 p-6 lg:p-8">
        <div>
          <p class="section-kicker">Appointment Form</p>
          <h2 class="mt-3 text-3xl font-bold text-gray-900">Tell us what you need</h2>
          <p class="mt-3 text-base leading-7 text-gray-600">
            Fill in the form below and we’ll take it from there.
          </p>
        </div>

        <p v-if="successMessage" class="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {{ errorMessage }}
        </p>

        <div class="mt-8 grid gap-5 md:grid-cols-2">
          <div class="flex flex-col">
            <label class="modern-label">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              v-model="formState.firstName"
              required
              class="modern-input"
            />
          </div>
          <div class="flex flex-col">
            <label class="modern-label">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              v-model="formState.lastName"
              required
              class="modern-input"
            />
          </div>
        </div>

        <div class="mt-5 grid gap-5 md:grid-cols-2">
          <div class="flex flex-col">
            <label class="modern-label">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              v-model="formState.phone"
              required
              class="modern-input"
            />
          </div>
          <div class="flex flex-col">
            <label class="modern-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              v-model="formState.email"
              required
              class="modern-input"
            />
          </div>
        </div>

        <div class="mt-5 grid gap-5 md:grid-cols-3">
          <div class="flex flex-col md:col-span-1">
            <label class="modern-label">Date</label>
            <input
              type="date"
              :min="minDate"
              v-model="formState.date"
              class="modern-input"
              required
            />
          </div>
          <div class="flex flex-col">
            <label class="modern-label">From</label>
            <input
              type="time"
              v-model="formState.timeFrom"
              :min="minTime"
              :max="maxTime"
              step="1800"
              class="modern-input"
              required
            />
          </div>
          <div class="flex flex-col">
            <label class="modern-label">To</label>
            <input
              type="time"
              v-model="formState.timeTo"
              :min="minTime"
              :max="maxTime"
              step="1800"
              class="modern-input"
              required
            />
          </div>
        </div>

        <div class="mt-5 flex flex-col">
          <label for="details" class="modern-label">More Information</label>
          <textarea
            id="details"
            required
            v-model="formState.details"
            rows="5"
            class="modern-input resize-none"
            placeholder="Share what you would like support with."
          ></textarea>
        </div>

        <button type="submit" :disabled="isSubmitting" class="btn mt-8 w-full justify-center py-3 text-base">
          {{ isSubmitting ? "Sending..." : "Book Now" }}
        </button>
      </form>
    </section>

    <Newsletter />
  </div>
</template>

<script setup>
const siteUrl = useRuntimeConfig().public.siteUrl;
const pageTitle = "Consultation With Dr. Ijeoma Dozie | Vansfield Lifestyle MD";
const pageDescription =
  "Book a consultation with Dr. Ijeoma Dozie for personalized wellness guidance, lifestyle medicine support, preventive care planning, and health strategy.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: `${siteUrl}/consultation`,
  ogImage: `${siteUrl}/assets/img/drdozie4.png`,
  ogImageAlt: "Book a consultation with Dr. Ijeoma Dozie",
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}/assets/img/drdozie4.png`,
});

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/consultation` }],
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

const today = new Date().toISOString().split("T")[0];
const minDate = today;
const minTime = "09:00";
const maxTime = "17:00";

const backend = useRuntimeConfig().public.backendUrl;
const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const resetForm = () => {
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
};

const submitAppointment = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    successMessage.value = "";
    await $fetch(`${backend}/appointments`, {
      method: "POST",
      body: formState.value,
    });
    successMessage.value = "Your consultation request has been submitted successfully.";
    resetForm();
  } catch (error) {
    errorMessage.value =
      error?.data?.message || "Unable to submit your request right now.";
    console.error("Error submitting appointment:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
