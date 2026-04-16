<template>
  <div
    class="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fef3c7_0%,#fafaf9_30%,#ecfdf5_58%,#d1fae5_100%)] px-4 py-8 lg:px-8 lg:py-10"
  >
    <div class="absolute left-10 top-10 h-40 w-40 rounded-full bg-yellow-300/25 blur-3xl"></div>
    <div class="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl"></div>

    <div class="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-stretch gap-6 lg:grid-cols-[0.96fr_1.04fr]">
      <section
        class="relative order-2 hidden overflow-hidden rounded-[36px] bg-teal-700 p-8 text-white shadow-[0_30px_80px_rgba(13,110,103,0.24)] lg:order-1 lg:block lg:p-10"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]"></div>
        <div class="relative flex h-full flex-col">
          <div>
            <p class="section-kicker !text-yellow-300">Welcome Back</p>
            <h1 class="mt-4 max-w-lg text-4xl font-bold leading-tight lg:text-6xl">
              Continue your wellness journey with confidence.
            </h1>
            <p class="mt-6 max-w-xl text-base leading-8 text-teal-50/90 lg:text-lg">
              Sign in to continue with a calm, simple experience built around the Vansfield brand.
            </p>
          </div>

          <div class="mt-8 rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
            <p class="text-sm uppercase tracking-[0.14em] text-yellow-300">
              Brand Note
            </p>
            <p class="mt-4 max-w-md text-sm leading-7 text-teal-50/85">
              Clean, welcoming, and ready for client-facing work.
            </p>
          </div>

          <div class="mt-auto pt-8">
            <div class="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-teal-50/90">
              Calm, clear, and client-ready.
            </div>
          </div>
        </div>
      </section>

      <section class="admin-shell order-1 mx-auto flex w-full max-w-xl items-center lg:order-2">
        <form @submit.prevent="login" class="w-full rounded-[28px] bg-white p-8 lg:p-10">
          <NuxtLink to="/" class="mb-8 flex items-center justify-between">
            <div class="flex items-center">
              <img
                src="/assets/img/vansfield-logo.png"
                alt="Vansfield Lifestyle MD logo"
                class="w-12"
              />
              <span class="ml-3 font-serif text-lg uppercase">
                Vansfield Lifestyle MD
              </span>
            </div>
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-xl font-semibold text-gray-500">
                &times;
              </span>
            </NuxtLink>

          <p class="section-kicker">Account Login</p>
          <h2 class="mt-3 text-3xl font-bold text-gray-900 lg:text-4xl">
            Sign in to your account
          </h2>
          <p class="mt-3 text-base leading-7 text-gray-600">
            Use your email and password to continue.
          </p>

          <p v-if="errorMsg" class="error mt-5 pb-0">{{ errorMsg }}</p>

          <div class="mt-8 space-y-5">
            <div class="flex flex-col">
              <label class="modern-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                class="modern-input"
                v-model="email"
                required
              />
            </div>
            <div class="flex flex-col">
              <label class="modern-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                class="modern-input"
                v-model="password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading === true"
            class="btn mt-8 w-full justify-center py-3 text-base"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="animate-pulse">Signing in...</span>
          </button>

          <p class="mt-6 text-center text-sm italic text-gray-600">
            Don't have an account?
            <NuxtLink class="font-bold text-teal-700 hover:underline" to="/register">
              Register
            </NuxtLink>
          </p>

          <div class="mt-8 rounded-[24px] border border-stone-200 bg-stone-50 p-5 lg:hidden">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Vansfield Lifestyle MD
            </p>
            <p class="mt-3 text-sm leading-7 text-gray-600">
              Calm, clear, and client-ready.
            </p>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard/appointments",
  },
});

useHead({
  title: "Vansfield Lifestyle MD | Login",
});

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMsg = ref("");

const { signIn } = useAuth();

const clearError = () => {
  setTimeout(() => {
    errorMsg.value = "";
  }, 5000);
};

const login = async () => {
  isLoading.value = true;

  const credentials = {
    email: email.value,
    password: password.value,
  };

  const timeout = setTimeout(() => {
    isLoading.value = false;
    errorMsg.value = "Login is taking too long, please check your network.";
    clearError();
  }, 10000);

  try {
    await signIn(credentials, { callbackUrl: "/" });
    clearTimeout(timeout);
    clearError();
  } catch (error) {
    clearTimeout(timeout);
    if (error.response.status === 401) {
      errorMsg.value = "Invalid login details.";
    } else {
      errorMsg.value = "Login failed. Please try again.";
    }
    clearError();
  } finally {
    isLoading.value = false;
  }
};
</script>
