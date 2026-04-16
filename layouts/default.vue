<template>
  <NuxtLoadingIndicator :height="5" color="#008080" />

  <div class="min-h-screen">
    <EditProfile
      v-if="isShowingEditProfile"
      @close-edit-profile="isShowingEditProfile = false"
    />

    <header class="sticky top-0 z-40 border-b border-white/70 bg-stone-50/90 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-10 lg:py-4">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="/assets/img/vansfield-logo.png"
            alt="Vansfield Lifestyle MD logo"
            class="w-11 sm:w-14"
          />
          <div class="font-serif uppercase leading-tight text-gray-900">
            <p class="text-xs sm:text-base">Vansfield Lifestyle</p>
            <p class="text-[10px] tracking-[0.24em] text-teal-700 sm:text-sm">MD</p>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-6 lg:flex">
          <NuxtLink to="/" class="font-medium text-gray-600 transition hover:text-teal-700">
            Home
          </NuxtLink>
          <NuxtLink to="/shop" class="font-medium text-gray-600 transition hover:text-teal-700">
            Plans
          </NuxtLink>
          <NuxtLink to="/gallery" class="font-medium text-gray-600 transition hover:text-teal-700">
            Gallery
          </NuxtLink>
          <NuxtLink
            v-if="status === 'unauthenticated'"
            to="/login"
            class="font-medium text-gray-600 transition hover:text-teal-700"
          >
            Login
          </NuxtLink>
          <NuxtLink to="/consultation" class="btn shadow-[0_0_30px_rgba(250,204,21,0.35)]">
            Book a Consultation
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <div
            v-if="status === 'authenticated'"
            ref="desktopAccountMenu"
            class="relative"
          >
            <button
              class="flex items-center gap-3 rounded-2xl border border-teal-200 bg-white px-3 py-2 text-left shadow-[0_0_24px_rgba(13,110,103,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(13,110,103,0.2)]"
              @click="showDesktopAccountMenu = !showDesktopAccountMenu"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                {{ userInitials }}
              </span>
              <span>
                <span class="block text-sm font-semibold text-gray-900">
                  {{ user?.firstName }} {{ user?.lastName }}
                </span>
                <span class="block text-xs uppercase tracking-[0.16em] text-teal-700">
                  Account
                </span>
              </span>
            </button>

            <div
              v-if="showDesktopAccountMenu"
              class="absolute right-0 top-16 z-40 w-56 rounded-[24px] border border-stone-200 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.14)]"
            >
              <button
                class="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-stone-100"
                @click="isShowingEditProfile = true; showDesktopAccountMenu = false"
              >
                Edit Profile
              </button>
              <button
                v-if="user && (user.role === 'admin' || user.role === 'sAdmin')"
                class="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-stone-100"
                @click="navigateTo('/dashboard/appointments'); showDesktopAccountMenu = false"
              >
                Dashboard
              </button>
              <button
                class="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
                @click="logout"
              >
                Log Out
              </button>
            </div>
          </div>

          <button
            class="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm lg:hidden"
          >
            Menu
          </button>
        </div>

        <div class="flex items-center gap-2 lg:hidden">
          <button
            v-if="status === 'authenticated'"
            ref="mobileAccountMenu"
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-sm font-bold text-white shadow-[0_0_24px_rgba(13,110,103,0.18)]"
            @click="showMobileAccountMenu = !showMobileAccountMenu"
          >
            {{ userInitials }}
          </button>
          <button
            class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-stone-200"
            @click="toggleMenu"
          >
            {{ isMenuOpen ? "Close" : "Menu" }}
          </button>
        </div>
      </div>

      <transition name="slide-down">
        <div
          v-if="isMenuOpen"
          class="border-t border-stone-200 bg-white px-4 py-4 lg:hidden"
        >
          <div class="mx-auto flex max-w-7xl flex-col gap-3">
            <NuxtLink to="/" class="rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-stone-100" @click="isMenuOpen = false">
              Home
            </NuxtLink>
            <NuxtLink to="/shop" class="rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-stone-100" @click="isMenuOpen = false">
              Plans
            </NuxtLink>
            <NuxtLink to="/gallery" class="rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-stone-100" @click="isMenuOpen = false">
              Gallery
            </NuxtLink>
            <NuxtLink
              v-if="status === 'unauthenticated'"
              to="/login"
              class="rounded-2xl px-4 py-3 font-medium text-gray-700 transition hover:bg-stone-100"
              @click="isMenuOpen = false"
            >
              Login
            </NuxtLink>
            <NuxtLink to="/consultation" class="btn mt-2 w-full justify-center shadow-[0_0_30px_rgba(250,204,21,0.35)]" @click="isMenuOpen = false">
              Book a Consultation
            </NuxtLink>
          </div>
        </div>
      </transition>

      <div
        v-if="status === 'authenticated' && showMobileAccountMenu"
        class="border-t border-stone-200 bg-stone-50 px-4 py-3 lg:hidden"
      >
        <div class="mx-auto max-w-7xl rounded-[24px] border border-stone-200 bg-white p-3 shadow-sm">
          <p class="px-4 py-2 text-sm font-semibold text-gray-900">
            {{ user?.firstName }} {{ user?.lastName }}
          </p>
          <button
            class="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-stone-100"
            @click="isShowingEditProfile = true; showMobileAccountMenu = false"
          >
            Edit Profile
          </button>
          <button
            v-if="user && (user.role === 'admin' || user.role === 'sAdmin')"
            class="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-stone-100"
            @click="navigateTo('/dashboard/appointments'); showMobileAccountMenu = false"
          >
            Dashboard
          </button>
          <button
            class="mt-1 w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
            @click="logout"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>

    <main class="mt-5">
      <button
        v-if="showScrollButton"
        @click="scrollToTop"
        title="Back to top"
        aria-label="Back to top"
        class="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-gray-900 shadow-lg transition hover:bg-yellow-300"
      >
        ↑
      </button>
      <slot />
    </main>

    <footer class="mt-16 border-t border-teal-900/10 bg-[linear-gradient(135deg,#0f766e_0%,#115e59_100%)] text-white lg:mt-24">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.95fr] lg:px-10">
        <div>
          <div class="flex items-center gap-3">
            <img
              src="/assets/img/vansfield-logo.png"
              alt="Vansfield Lifestyle MD logo"
              class="w-14 rounded-2xl bg-white/95 p-2"
            />
            <div class="font-serif uppercase">
              <p class="text-lg">Vansfield Lifestyle MD</p>
              <p class="text-xs tracking-[0.24em] text-teal-100">Wellness, Consulting, Impact</p>
            </div>
          </div>
          <p class="mt-5 max-w-md text-sm leading-7 text-teal-50/85">
            Practical preventive care, health strategy, training, and wellness plans
            built around real life.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink to="/consultation" class="btn">Book Consultation</NuxtLink>
            <NuxtLink to="/shop" class="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore Plans
            </NuxtLink>
          </div>
        </div>

        <div>
          <h5 class="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
            Explore
          </h5>
          <ul class="mt-5 space-y-3 text-sm text-teal-50/90">
            <li><NuxtLink to="/" class="transition hover:text-white">Home</NuxtLink></li>
            <li><NuxtLink to="/shop" class="transition hover:text-white">Plans and Products</NuxtLink></li>
            <li><NuxtLink to="/gallery" class="transition hover:text-white">Gallery</NuxtLink></li>
            <li><NuxtLink to="/consultation" class="transition hover:text-white">Consultation</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5 class="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
            Services
          </h5>
          <ul class="mt-5 space-y-3 text-sm text-teal-50/90">
            <li>Consultation</li>
            <li>Training</li>
            <li>Speaking Engagements</li>
            <li>Wellness Planning</li>
          </ul>
        </div>

        <div>
          <h5 class="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
            Contact
          </h5>
          <div class="mt-5 space-y-4 text-sm text-teal-50/90">
            <a href="mailto:vansfieldlifestylemd@gmail.com" class="block transition hover:text-white">
              vansfieldlifestylemd@gmail.com
            </a>
            <a href="tel:+2348034500963" class="block transition hover:text-white">
              +234 (0) 803 450 0963
            </a>
            <p class="leading-7 text-teal-100/80">
              Available for consultations, wellness partnerships, corporate training,
              and speaking requests.
            </p>
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 px-4 py-4 text-center text-sm text-teal-100/75">
        Website crafted by
        <a
          href="https://www.simplyroyalty.com"
          target="_blank"
          class="font-semibold text-yellow-300"
        >
          Royalty
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { status, data } = useAuthState();
const { signOut } = useAuth();

const isMenuOpen = ref(false);
const isShowingEditProfile = ref(false);
const showScrollButton = ref(false);
const showMobileAccountMenu = ref(false);
const showDesktopAccountMenu = ref(false);
const desktopAccountMenu = ref(null);
const mobileAccountMenu = ref(null);

const user = computed(() => data.value);
const userInitials = computed(() => {
  const first = user.value?.firstName?.[0] || "";
  const last = user.value?.lastName?.[0] || "";
  return `${first}${last}`.toUpperCase() || "VL";
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 600;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const logout = async () => {
  await signOut({ callbackUrl: "/" });
};

const handleClickOutside = (event) => {
  if (
    showDesktopAccountMenu.value &&
    desktopAccountMenu.value &&
    !desktopAccountMenu.value.contains(event.target)
  ) {
    showDesktopAccountMenu.value = false;
  }

  if (
    showMobileAccountMenu.value &&
    mobileAccountMenu.value &&
    !mobileAccountMenu.value.contains(event.target)
  ) {
    showMobileAccountMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.router-link-active {
  color: #0f766e;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.28s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
