<template>
  <SplashScreen v-if="!isComplete" />
  <div class="overflow-x-clip">
    <main class="w-full flex flex-col items-center">
      <section class="w-full px-4 pt-8 lg:px-20 lg:pt-12">
        <div
          class="mx-auto grid max-w-7xl items-center gap-12 rounded-[36px] bg-white px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-12"
        >
          <div>
            <p class="section-kicker">Lifestyle Medicine And Consulting</p>
            <h1
              class="mt-4 max-w-4xl font-serif text-5xl font-bold leading-tight text-gray-900 lg:text-7xl"
            >
              Transform Your Lifestyle, Embrace Wellness.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:text-xl">
              Personalized consultations, practical wellness plans, speaking
              engagements, and health strategy support designed around real life.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <NuxtLink to="/consultation" class="btn">
                Book a Consultation
              </NuxtLink>
              <NuxtLink to="/shop" class="btn2">
                Explore Plans
              </NuxtLink>
            </div>
            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div
                v-for="stat in heroStats"
                :key="stat.title"
                class="rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-4"
              >
                <p class="text-2xl font-bold text-teal-700">{{ stat.value }}</p>
                <p class="mt-1 text-sm font-medium text-gray-600">{{ stat.title }}</p>
              </div>
            </div>
          </div>

          <div class="relative flex justify-center">
            <div
              class="absolute inset-x-10 top-8 bottom-10 rounded-[40px] bg-[radial-gradient(circle_at_top,#fde68a_0%,#facc15_28%,#0f766e_29%,#115e59_100%)] opacity-15 blur-2xl"
            ></div>
            <div
              class="relative flex min-h-[460px] w-full max-w-[520px] items-end justify-center overflow-hidden rounded-[36px] bg-teal-700 px-6 pt-10 shadow-[0_35px_85px_rgba(13,110,103,0.24)]"
            >
              <span class="hero-bubble left-5 top-7">Public Speaking</span>
              <span class="hero-bubble right-5 top-24">Training</span>
              <span class="hero-bubble left-6 bottom-28">Consultations</span>
              <span class="hero-bubble right-6 bottom-12">Health Plans</span>
              <img
                src="/assets/img/drdozie4.png"
                alt="Image of Dr. Ijeoma Dozie"
                class="relative z-10 w-full max-w-[360px] object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.25)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="w-full px-4 py-14 lg:px-20 lg:py-20">
        <div
          class="mx-auto grid max-w-7xl gap-10 rounded-[36px] bg-teal-700 px-6 py-8 text-gray-100 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-12"
        >
          <div class="relative flex items-end justify-center overflow-hidden rounded-[32px] bg-teal-800/70 px-6 pt-10">
            <div
              class="absolute inset-6 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,#facc15_0%,rgba(250,204,21,0.25)_20%,rgba(13,110,103,0)_62%)]"
            ></div>
            <img
              src="/assets/img/dr.dozie.png"
              alt="Portrait of Dr. Ijeoma Dozie"
              class="relative z-10 w-full max-w-[420px] object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.28)]"
            />
          </div>

          <div>
            <p class="section-kicker !text-yellow-300">Get To Know</p>
            <h2 class="mt-3 text-4xl font-bold lg:text-6xl">Dr Ijeoma Dozie</h2>
            <p class="mt-4 max-w-3xl text-base leading-8 text-teal-50/90 lg:text-lg">
              Consultant Family Physician, board-certified lifestyle medicine
              physician, wellness advocate, speaker, and health systems
              strategist focused on practical preventive care for African
              communities and modern organizations.
            </p>

            <div class="mt-8 grid gap-4 md:grid-cols-2">
              <article
                v-for="highlight in aboutHighlights"
                :key="highlight.title"
                class="rounded-[26px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
              >
                <p class="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-300">
                  {{ highlight.title }}
                </p>
                <p class="mt-3 text-base leading-7 text-teal-50/90">
                  {{ highlight.text }}
                </p>
              </article>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in impactAreas"
                :key="item"
                class="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white"
              >
                {{ item }}
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-4">
              <NuxtLink to="/consultation" class="btn">
                Book Dr. Dozie
              </NuxtLink>
              <NuxtLink to="/gallery" class="btn2 !border-white/40 !bg-transparent !text-white hover:!bg-white hover:!text-teal-800">
                View Gallery
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-stone-100 px-4 py-14 lg:px-20 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <header class="mb-10">
            <p class="section-kicker">My Services</p>
            <h3 class="mt-3 text-3xl font-bold text-gray-900 lg:text-4xl">
              Support designed around how people actually live and work
            </h3>
          </header>

          <div class="grid gap-8 xl:grid-cols-[430px_minmax(0,1fr)]">
            <ul
              ref="serviceList"
              class="flex w-full gap-4 overflow-x-auto xl:flex-col xl:overflow-visible"
            >
              <li
                @click="handleClick(1)"
                ref="consultRef"
                :class="{ selected: selectedService === 1 }"
                class="service-card group cursor-pointer"
              >
                <div
                  class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/15 ring-1 ring-inset ring-teal-100"
                >
                  <img
                    src="/assets/img/consult.svg"
                    alt="Consultation icon"
                    :class="{ invert: selectedService === 1 }"
                    class="w-10 transition duration-500 group-hover:invert"
                  />
                </div>
                <div class="ml-4 w-full">
                  <h4 class="text-lg font-bold uppercase tracking-wide">Consultation</h4>
                  <p
                    class="mt-1 text-sm"
                    :class="selectedService === 1 ? 'text-teal-50/80' : 'text-gray-500'"
                  >
                    Speak to your doctor from anywhere.
                  </p>
                  <div
                    v-if="selectedService === 1"
                    class="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
                  >
                    <div
                      class="h-full rounded-full bg-yellow-400 transition-all duration-150"
                      :style="{ width: `${progress}%` }"
                    ></div>
                  </div>
                </div>
              </li>
              <li
                @click="handleClick(2)"
                :class="{ selected: selectedService === 2 }"
                class="service-card group cursor-pointer"
                ref="trainRef"
              >
                <div
                  class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/15 ring-1 ring-inset ring-teal-100"
                >
                  <img
                    src="/assets/img/train.svg"
                    alt="Training icon"
                    :class="{ 'invert-0': selectedService === 2 }"
                    class="w-10 filter invert transition duration-500 group-hover:invert-0"
                  />
                </div>
                <div class="ml-4 w-full">
                  <h4 class="text-lg font-bold uppercase tracking-wide">Training</h4>
                  <p
                    class="mt-1 text-sm"
                    :class="selectedService === 2 ? 'text-teal-50/80' : 'text-gray-500'"
                  >
                    Practical coaching for healthier habits and teams.
                  </p>
                  <div
                    v-if="selectedService === 2"
                    class="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
                  >
                    <div
                      class="h-full rounded-full bg-yellow-400 transition-all duration-150"
                      :style="{ width: `${progress}%` }"
                    ></div>
                  </div>
                </div>
              </li>
              <li
                @click="handleClick(3)"
                :class="{ selected: selectedService === 3 }"
                class="service-card group cursor-pointer"
                ref="speakRef"
              >
                <div
                  class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/15 ring-1 ring-inset ring-teal-100"
                >
                  <img
                    src="/assets/img/conference.svg"
                    alt="Speaking icon"
                    :class="{ invert: selectedService === 3 }"
                    class="w-10 transition duration-500 group-hover:invert"
                  />
                </div>
                <div class="ml-4 w-full">
                  <h4 class="text-lg font-bold uppercase tracking-wide">Speaking</h4>
                  <p
                    class="mt-1 text-sm"
                    :class="selectedService === 3 ? 'text-teal-50/80' : 'text-gray-500'"
                  >
                    Insightful talks for health, leadership, and systems change.
                  </p>
                  <div
                    v-if="selectedService === 3"
                    class="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
                  >
                    <div
                      class="h-full rounded-full bg-yellow-400 transition-all duration-150"
                      :style="{ width: `${progress}%` }"
                    ></div>
                  </div>
                </div>
              </li>
            </ul>

            <Transition name="fade" mode="out-in">
              <div
                :key="selectedService"
                class="rounded-[32px] border border-stone-200 bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)] lg:p-10"
              >
                <p class="section-kicker">{{ activeService.kicker }}</p>
                <h4 class="mt-3 text-4xl font-extrabold text-gray-900 lg:text-5xl">
                  {{ activeService.title }}
                </h4>
                <p class="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                  {{ activeService.description }}
                </p>
                <div class="mt-8 grid gap-3 md:grid-cols-2">
                  <div
                    v-for="point in activeService.points"
                    :key="point"
                    class="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    {{ point }}
                  </div>
                </div>
                <NuxtLink to="/consultation" class="btn mt-8">
                  Start Here
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <HomeCarousel />

      <section class="w-full bg-teal-700 px-4 py-14 lg:px-20 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <header class="text-gray-100">
            <p class="section-kicker !text-yellow-300">Plans And Products</p>
            <h3 class="mt-3 text-3xl font-bold lg:text-4xl">
              Sustain your wellness journey with guided options
            </h3>
          </header>
          <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <NuxtLink to="/shop" class="product-card group">
              <div class="overflow-hidden rounded-[22px] bg-white/10">
                <img
                  src="/assets/img/VLMD-BEST-HEALTH-INSURANCE-PLANS-IN-INDIA.png"
                  alt="General health plan"
                  class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                General Health Plans
              </p>
              <h4 class="mt-2 text-2xl font-bold">Build a practical wellness base</h4>
              <p class="mt-3 text-sm leading-7 text-teal-50/85">
                Simple, supportive plan options for people who want structure,
                accountability, and a healthier routine.
              </p>
            </NuxtLink>

            <NuxtLink to="/shop" class="product-card group">
              <div class="overflow-hidden rounded-[22px] bg-white/10">
                <img
                  src="/assets/img/VLMD-6345740880a17c09b91d7262_paytient-narrow-network-health-plans-blog.png"
                  alt="Personalized health plan"
                  class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Personalized Plans
              </p>
              <h4 class="mt-2 text-2xl font-bold">Designed around individual needs</h4>
              <p class="mt-3 text-sm leading-7 text-teal-50/85">
                Targeted plans shaped by lifestyle, goals, and health priorities
                for a more customized path forward.
              </p>
            </NuxtLink>

            <NuxtLink to="/shop" class="product-card group">
              <div class="overflow-hidden rounded-[22px] bg-white/10">
                <img
                  src="/assets/img/VLMD-health-insurance-hospital-medical-care-concept_178888-446.png"
                  alt="Family or couples plan"
                  class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Shared Plans
              </p>
              <h4 class="mt-2 text-2xl font-bold">Support for couples and families</h4>
              <p class="mt-3 text-sm leading-7 text-teal-50/85">
                Wellness plans that encourage shared accountability and long-term
                lifestyle improvement together.
              </p>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="w-full px-4 py-14 lg:px-20 lg:py-24">
        <div class="mx-auto max-w-7xl">
          <header class="mb-10 lg:mb-14">
            <p class="section-kicker">Testimonials</p>
            <h3 class="mt-3 text-3xl font-bold text-gray-900 lg:text-4xl">
              Warm feedback from wellness, training, and speaking engagements
            </h3>
          </header>

          <div class="grid gap-6 lg:grid-cols-2">
            <article
              v-for="item in testimonialItems"
              :key="item.name"
              class="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] lg:p-7"
            >
              <div class="flex items-start gap-4">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-stone-100"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                    {{ item.role }}
                  </p>
                  <div class="mt-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p class="text-2xl font-bold text-gray-900">{{ item.name }}</p>
                      <p class="mt-1 text-sm text-gray-500">{{ item.title }}</p>
                    </div>
                    <p class="text-base tracking-[0.18em] text-yellow-400">★★★★★</p>
                  </div>
                  <p class="mt-5 text-base leading-8 text-gray-600">
                    "{{ item.quote }}"
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <form
        @submit.prevent="handleSubmit"
        id="newsletter"
        class="mb-12 w-11/12 max-w-6xl rounded-[36px] bg-teal-800 bg-[url('/assets/img/dcphands.png')] bg-cover bg-center px-8 py-10 shadow-[0_35px_85px_rgba(13,110,103,0.2)]"
      >
        <div class="flex flex-col items-center text-center">
          <p class="section-kicker !text-yellow-300">Stay Connected</p>
          <h3 class="mt-3 text-3xl font-bold text-gray-100 lg:text-5xl">
            Begin your <span class="text-yellow-400">Healthy Lifestyle</span>
            Journey Here
          </h3>
          <p class="pt-5 text-lg text-gray-100/90 lg:text-xl">
            Join the email list for updates, resources, and new plan releases.
          </p>
        </div>
        <p v-if="responseMsg" class="mt-5 text-center text-lg text-yellow-300">
          {{ responseMsg }}
        </p>
        <div class="mt-8 flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            class="modern-input lg:flex-1"
            v-model="name"
            placeholder="What's your name?"
            required
            autocomplete="name"
          />
          <input
            type="email"
            class="modern-input lg:flex-1"
            v-model="email"
            placeholder="What's your email?"
            required
            autocomplete="email"
          />
          <button class="btn min-w-[140px]">
            Join
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
const siteUrl = useRuntimeConfig().public.siteUrl;
const pageTitle = "Vansfield Lifestyle MD | Lifestyle Medicine, Wellness Consulting, and Preventive Care";
const pageDescription =
  "Work with Dr. Ijeoma Dozie for lifestyle medicine consultations, corporate wellness strategy, speaking engagements, training, and personalized health plans.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: "website",
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/assets/img/drdozie4.png`,
  ogImageAlt: "Dr. Ijeoma Dozie of Vansfield Lifestyle MD",
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}/assets/img/drdozie4.png`,
});

useHead({
  link: [{ rel: "canonical", href: siteUrl }],
});

definePageMeta({
  auth: false,
});

import { useSplash } from "../composables/useSplash";

const { isComplete } = useSplash();
const config = useRuntimeConfig();
const backend = config.public.backendUrl;
const name = ref("");
const email = ref("");
const responseMsg = ref(null);

const heroStats = [
  { value: "20+", title: "Years of clinical and wellness leadership" },
  { value: "100s", title: "Professionals trained and mentored" },
  { value: "Global", title: "Speaking, strategy, and consulting reach" },
];

const aboutHighlights = [
  {
    title: "Clinical Leadership",
    text: "Integrating lifestyle medicine, preventive care, and practical clinical guidance for long-term health improvement.",
  },
  {
    title: "Consulting And Strategy",
    text: "Advising individuals, organizations, and health initiatives on wellness systems, behavior change, and care delivery.",
  },
  {
    title: "Training And Mentorship",
    text: "Helping health professionals and teams strengthen knowledge, confidence, and healthier ways of working.",
  },
  {
    title: "Speaking Engagements",
    text: "Delivering keynote talks, moderated sessions, and thought leadership conversations with warmth and clarity.",
  },
];

const impactAreas = [
  "Lifestyle medicine training and coaching",
  "Health and wellness consulting for individuals or teams",
  "Research and public health collaborations",
  "Strategic partnerships in health systems innovation",
];

const testimonialItems = [
  {
    name: "Amina O.",
    role: "Wellness Client",
    title: "Personal guidance that felt practical",
    quote:
      "The consultations were clear, thoughtful, and realistic. I left each session knowing exactly what to focus on next.",
    image:
      "https://images.pexels.com/photos/16240022/pexels-photo-16240022.jpeg?cs=srgb&dl=pexels-oluwakoreimage-16240022.jpg&fm=jpg",
  },
  {
    name: "Corporate Team Lead",
    role: "Training Participant",
    title: "Professional and easy to follow",
    quote:
      "Dr. Dozie broke complex health ideas into simple actions our team could actually apply in everyday work and life.",
    image:
      "https://images.pexels.com/photos/7403185/pexels-photo-7403185.jpeg?cs=srgb&dl=pexels-rdne-7403185.jpg&fm=jpg",
  },
  {
    name: "Conference Host",
    role: "Speaking Engagement",
    title: "Warm, credible, and audience-aware",
    quote:
      "Her delivery was confident and engaging. The room stayed with her from start to finish because the message felt both expert and human.",
    image:
      "https://images.pexels.com/photos/12311514/pexels-photo-12311514.jpeg?cs=srgb&dl=pexels-josepheulo-nyc-12311514.jpg&fm=jpg",
  },
  {
    name: "Lifestyle Program Participant",
    role: "Health Coaching",
    title: "Supportive without being overwhelming",
    quote:
      "The process felt calm and structured. I appreciated how the guidance was tailored to my real routine instead of generic advice.",
    image:
      "https://images.pexels.com/photos/7625294/pexels-photo-7625294.jpeg?cs=srgb&dl=pexels-mikhail-nilov-7625294.jpg&fm=jpg",
  },
];

const serviceContent = {
  1: {
    kicker: "Virtual And Personal Support",
    title: "Consultations",
    description:
      "Meet Dr. Dozie for confidential, practical consultations that help you make sense of your current health concerns and build a realistic path forward.",
    points: [
      "Convenient sessions from anywhere",
      "Clear next steps and personalized guidance",
      "Support for lifestyle and preventive health goals",
      "A calm, professional experience centered on you",
    ],
  },
  2: {
    kicker: "Coaching And Capacity Building",
    title: "Training",
    description:
      "Structured wellness and training support for individuals, teams, and health professionals looking to build healthier habits and stronger systems.",
    points: [
      "Lifestyle behavior change support",
      "Workshops for teams and organizations",
      "Practical guidance instead of generic advice",
      "Designed for sustainable progress",
    ],
  },
  3: {
    kicker: "Thought Leadership",
    title: "Speaking Engagements",
    description:
      "Insightful talks and expert facilitation on health, prevention, leadership, wellness strategy, and the future of care in African contexts.",
    points: [
      "Keynotes and conference sessions",
      "Panels, moderating, and executive conversations",
      "Clear messaging for professional audiences",
      "Evidence-based and audience-aware delivery",
    ],
  },
};

const SERVICES_COUNT = 3;
const MAX_TIME = 10_000;
const selectedService = ref(1);
const timer = ref(MAX_TIME);
const interval = ref(null);
const serviceList = ref(null);
const consultRef = ref(null);
const trainRef = ref(null);
const speakRef = ref(null);

const progress = computed(() => ((MAX_TIME - timer.value) / MAX_TIME) * 100);
const activeService = computed(() => serviceContent[selectedService.value]);

const startTimer = () => {
  clearInterval(interval.value);
  timer.value = MAX_TIME;
  interval.value = setInterval(() => {
    timer.value -= 100;
    if (timer.value <= 0) {
      selectedService.value =
        selectedService.value >= SERVICES_COUNT ? 1 : selectedService.value + 1;
      timer.value = MAX_TIME;
    }
  }, 100);
};

const handleClick = (serviceNum) => {
  selectedService.value = serviceNum;
  startTimer();
};

watch(selectedService, (id) => {
  const serviceRefs = {
    1: consultRef,
    2: trainRef,
    3: speakRef,
  }[id];
  const container = serviceList.value;
  const target = serviceRefs?.value;

  if (container && target) {
    const scrollLeft =
      target.offsetLeft -
      container.offsetLeft -
      container.clientWidth / 2 +
      target.clientWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }
});

defineOgImageComponent("NuxtSeo", {
  colorMode: "dark",
  theme: "#008080",
  sitelogo: "/favicon.ico",
});

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

const handleSubmit = async () => {
  try {
    const response = await $fetch(`${backend}/newsletter`, {
      method: "POST",
      body: { name: name.value, email: email.value },
    });
    responseMsg.value = response.message;
    setTimeout(() => {
      responseMsg.value = "";
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  height: 4px;
}
</style>
