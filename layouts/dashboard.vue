<template>
  <NuxtLoadingIndicator :height="4" color="#0f766e" />

  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,#fef3c7_0%,#fafaf9_26%,#ecfdf5_55%,#d1fae5_100%)] text-slate-900"
  >
    <EditProfile
      v-if="isShowingEditProfile"
      @close-edit-profile="isShowingEditProfile = false"
    />

    <div class="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <header
        class="sticky top-3 z-30 overflow-visible rounded-[24px] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:top-4 sm:rounded-[30px] sm:shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
      >
        <div class="flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 lg:px-6 lg:py-4">
          <NuxtLink to="/" class="flex min-w-0 items-center gap-3">
            <img
              src="/assets/img/vansfield-logo.png"
              alt="Vansfield Lifestyle MD logo"
              class="h-10 w-10 rounded-full bg-white object-contain shadow-sm lg:h-12 lg:w-12"
            />
            <div class="min-w-0">
              <p class="hidden text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 sm:block">
                Vansfield Lifestyle MD
              </p>
              <p class="truncate text-sm font-semibold text-gray-900 sm:mt-1 sm:text-base lg:text-lg">
                Admin Dashboard
              </p>
            </div>
          </NuxtLink>

          <div class="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-700 transition hover:border-teal-200 hover:text-teal-700 xl:hidden"
              aria-label="Open navigation"
              @click="isSidebarOpen = true"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            <NuxtLink
              to="/"
              class="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-teal-200 hover:text-teal-700 sm:inline-flex"
            >
              Home
            </NuxtLink>

            <div ref="accountMenu" class="relative">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-[linear-gradient(135deg,#0f766e_0%,#115e59_100%)] px-2.5 py-2 text-left text-white shadow-[0_14px_32px_rgba(13,148,136,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(13,148,136,0.34)] sm:gap-3 sm:px-3"
                @click.stop="showAccountMenu = !showAccountMenu"
              >
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-sm font-bold uppercase ring-1 ring-white/20 sm:h-11 sm:w-11"
                >
                  {{ userInitials }}
                </span>
                <span class="hidden lg:block">
                  <span class="block text-[11px] uppercase tracking-[0.18em] text-teal-100">
                    Signed In
                  </span>
                  <span class="mt-0.5 block text-sm font-semibold">
                    {{ fullName }}
                  </span>
                </span>
              </button>

              <div
                v-if="showAccountMenu"
                class="absolute right-0 top-full mt-3 w-[min(18rem,80vw)] rounded-[26px] border border-stone-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
              >
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-stone-50 hover:text-teal-700"
                  @click="openEditProfile"
                >
                  <span>Edit Profile</span>
                  <span class="text-lg leading-none">&times;</span>
                </button>
                <NuxtLink
                  to="/dashboard/appointments"
                  class="mt-1 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50 hover:text-teal-700"
                  @click="showAccountMenu = false"
                >
                  <span>Dashboard</span>
                  <span class="text-sm">Open</span>
                </NuxtLink>
                <button
                  type="button"
                  class="mt-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  @click="logout"
                >
                  <span>Log Out</span>
                  <span class="text-sm">Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] xl:hidden"
        @click="isSidebarOpen = false"
      ></div>

      <div class="mt-5 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
        <aside
          class="fixed left-0 top-0 z-20 h-full w-[88vw] max-w-[340px] overflow-y-auto border-r border-white/10 bg-[linear-gradient(180deg,#0f766e_0%,#115e59_100%)] p-6 text-white shadow-[0_28px_70px_rgba(13,110,103,0.24)] transition duration-300 xl:sticky xl:top-28 xl:block xl:h-[calc(100vh-8rem)] xl:w-auto xl:max-w-none xl:translate-x-0 xl:rounded-[32px] xl:border xl:border-white/70"
          :class="
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full xl:pointer-events-auto xl:translate-x-0'
          "
        >
          <div class="flex items-start justify-between gap-4 xl:block">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Navigation
              </p>
              <h2 class="mt-3 text-xl font-bold sm:text-2xl">Keep the dashboard clear.</h2>
              <p class="mt-3 max-w-md text-sm leading-6 text-teal-50/85">
                Quick access to bookings, requests, plans, and gallery content.
              </p>
            </div>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 xl:hidden"
              aria-label="Close navigation"
              @click="isSidebarOpen = false"
            >
              &times;
            </button>
          </div>

          <div class="mt-7 space-y-6">
            <div v-for="group in navGroups" :key="group.label">
              <p class="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-100/75">
                {{ group.label }}
              </p>
              <div class="mt-3 space-y-2">
                <NuxtLink
                  v-for="item in group.items"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center justify-between rounded-[22px] px-4 py-3.5 text-sm font-semibold transition"
                  :class="
                    isActive(item.matches)
                      ? 'bg-white/12 text-yellow-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  "
                  @click="isSidebarOpen = false"
                >
                  <span>{{ item.label }}</span>
                  <span
                    class="rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.16em]"
                    :class="
                      isActive(item.matches)
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-teal-100/80'
                    "
                  >
                    Open
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="mt-8 rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Session
            </p>
            <p class="mt-3 text-sm leading-6 text-teal-50/90">
              Signed in as {{ fullName }}.
            </p>
            <p class="mt-2 text-sm leading-6 text-teal-50/80">
              Use the header menu any time to update your profile or log out.
            </p>
          </div>

          <button
            type="button"
            class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-900 shadow-[0_18px_40px_rgba(250,204,21,0.28)] transition hover:-translate-y-0.5 hover:bg-yellow-300"
            @click="logout"
          >
            Log Out
          </button>
        </aside>

        <main class="space-y-5 sm:space-y-6">
          <div
            class="overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[34px] lg:p-6"
          >
            <slot />
          </div>

          <footer
            class="rounded-[24px] border border-white/70 bg-white/85 px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:px-5 sm:py-5"
          >
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Vansfield Lifestyle MD
                </p>
                <p class="mt-2 text-sm leading-7 text-gray-600">
                  Manage appointments, plan requests, catalog items, and gallery content from one clean workspace.
                </p>
              </div>
              <div class="flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href="mailto:vansfieldlifestylemd@gmail.com"
                  class="rounded-full border border-stone-200 bg-white px-4 py-2 text-gray-700 transition hover:border-teal-200 hover:text-teal-700"
                >
                  vansfieldlifestylemd@gmail.com
                </a>
                <a
                  href="tel:+2348034500963"
                  class="rounded-full border border-stone-200 bg-white px-4 py-2 text-gray-700 transition hover:border-teal-200 hover:text-teal-700"
                >
                  +234 803 450 0963
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Vansfield Lifestyle MD | Dashboard",
  description: "Admin Dashboard",
  robots: "noindex, nofollow",
});

const route = useRoute();
const { signOut } = useAuth();
const { data } = useAuthState();

const showAccountMenu = ref(false);
const accountMenu = ref(null);
const isShowingEditProfile = ref(false);
const isSidebarOpen = ref(false);

const user = computed(() => data.value || {});
const fullName = computed(() => {
  const firstName = user.value.firstName || "";
  const lastName = user.value.lastName || "";
  return `${firstName} ${lastName}`.trim() || "Account";
});

const userInitials = computed(() => {
  const initials = [user.value.firstName, user.value.lastName]
    .filter(Boolean)
    .map((value) => value[0])
    .join("");

  return initials || "VL";
});

const navGroups = [
  {
    label: "Care",
    items: [
      {
        label: "Appointments",
        to: "/dashboard/appointments",
        matches: ["/dashboard/appointments"],
      },
      {
        label: "Plan Requests",
        to: "/dashboard/requests",
        matches: ["/dashboard/requests"],
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        label: "Add Plan",
        to: "/dashboard/addproduct",
        matches: ["/dashboard/addproduct"],
      },
      {
        label: "View Plans",
        to: "/dashboard/viewproducts",
        matches: ["/dashboard/viewproducts", "/dashboard/editproduct"],
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        label: "Add Image",
        to: "/dashboard/gallery",
        matches: ["/dashboard/gallery"],
      },
      {
        label: "View Gallery",
        to: "/dashboard/gallery/viewgallery",
        matches: ["/dashboard/gallery/viewgallery", "/dashboard/gallery/edit"],
      },
    ],
  },
];

const isActive = (matches = []) =>
  matches.some((prefix) => route.path.startsWith(prefix));

const openEditProfile = () => {
  showAccountMenu.value = false;
  isShowingEditProfile.value = true;
};

const handleClickOutside = (event) => {
  if (accountMenu.value && !accountMenu.value.contains(event.target)) {
    showAccountMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => route.path,
  () => {
    isSidebarOpen.value = false;
    showAccountMenu.value = false;
  }
);

const logout = async () => {
  showAccountMenu.value = false;
  isSidebarOpen.value = false;
  await signOut({ callbackUrl: "/" });
};
</script>
