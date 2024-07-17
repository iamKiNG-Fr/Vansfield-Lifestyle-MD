sc

<template>
  <div class="">
    <header
      class="relative flex lg:px-40 px-4 pt-4 pb- lg:py-10 py-4 justify-between items-center max-[690px]:shadow-lg max-[690px]:bg-gray-100 z-20"
    >
      <NuxtLink to="/" class="border-none">
        <div class="flex items-center">
          <div>
            <img
              src="/assets/img/vansfield-logo.png"
              alt="Vansfield Lifestyle MD logo"
              class="w-16"
            />
          </div>
          <span class="ml-3 font-serif lg:text-lg uppercase lg:flex lg:gap-2">
            <div><span class="lg:text-2xl text-xl">V</span>ansfield</div>
            <div>
              <span class="lg:text-2xl text-xl">L</span>ifestyle
              <span class="lg:text-2xl text-xl">MD</span>
            </div>
          </span>
        </div>
      </NuxtLink>
      <nav class="flex items-center gap-5 max-[690px]:hidden">
        <NuxtLink to="/"
          ><p
            class="font-medium text-gray-500 hover:text-teal-700 hover:font-bold transition duration-300"
          >
            Home
          </p></NuxtLink
        >
        <NuxtLink to="/shop"
          ><p
            class="font-medium text-gray-500 hover:text-teal-700 hover:font-bold transition duration-300"
          >
            Shop
          </p></NuxtLink
        >
        <div v-if="status == 'unauthenticated'">
          <NuxtLink to="/login"
            ><p
              class="font-medium text-gray-500 hover:text-teal-700 hover:font-bold transition duration-300"
            >
              Login
            </p></NuxtLink
          >
        </div>
        <div v-else>
          <NuxtLink to="/dashboard/appointments"
            ><p
              class="font-medium text-gray-500 hover:text-teal-700 hover:font-bold transition duration-300"
            >
              Dashboard
            </p></NuxtLink
          >
        </div>
        <NuxtLink to="/consultation"
          ><button class="btn">Book a Consultauion</button></NuxtLink
        >
      </nav>
      <div class="min-[690px]:hidden relative">
        <UIcon
          name="material-symbols:menu-rounded"
          @click="toggleMenu"
          class="bg-teal-700"
          style="font-size: 30px; color: white"
          dynamic
        />
      </div>
    </header>
    <transition name="slide-down">
      <div
        class="relative dropdown flex flex-col bg-yellow-300 w-4/5 font-bold mx-auto p-3 rounded-b-2xl transition-all ease-in-out duration-300 min-[690px]:hidden"
        v-show="isMenuOpen"
      >
        <NuxtLink to="/" class="p-3 w-full text-center"
          ><UIcon
            name="material-symbols:house-rounded"
            class="text-2xl mr-2"
            dynamic
          />Home</NuxtLink
        >
        <NuxtLink to="/shop" class="p-3 w-full text-center"
          ><UIcon
            name="material-symbols:shopping-cart-rounded"
            class="text-2xl mr-2"
            dynamic
          />Shop</NuxtLink
        >
        
          <NuxtLink to="/login" class="p-3 w-full text-center" v-if="status == 'unauthenticated'">
           <UIcon
            name="material-symbols:login"
            class="text-2xl mr-2"
            dynamic
          />
              Login
            </NuxtLink
          >
          <NuxtLink to="/dashboard/appointments"
          class="p-3 w-full text-center" v-else>
          <UIcon name="material-symbols:space-dashboard" class="text-2xl mr-2" dynamic/>
              Dashboard
            </NuxtLink
          >
    
      </div>
    </transition>
    <!-- output page content -->
    <div class="mt-5">
      <button
        v-if="showScrollButton"
        @click="scrollToTop"
        class="fixed z-30 bottom-4 right-4 p-3 bg-yellow-400 text-gray-800 rounded-full shadow-md hover:bg-gray-600 transition-colors duration-300 animate-bounce"
      >
        <UIcon name="material-symbols:arrow-upward-alt-rounded" class="text-2xl" dynamic/>
      </button>
      <slot />
    </div>
    <footer
      class="bg-teal-700 text-gray-100 grid lg:grid-cols-4 grid-cols-1 justify-items-center lg:grid-rows-1 grid-rows-4 py-16 lg:px-32 px-10 lg:mt-28 mt-10"
    >
      <header>
        <img
          src="/assets/img/vansfield-logo.png"
          alt="logo"
          class="mx-auto mb-4"
        />
        <h4 class="uppercase text-lg mb-8 font-serif text-center">
          Vansfield Lifestyle MD
        </h4>
      </header>
      <div>
        <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">
          Coming soon
        </h5>
        <ul class="flex gap-4 flex-wrap justify-center lg:block">
          <li>Blog</li>
          <li>Shop</li>
          <li>Books</li>
          <li>Health Plans</li>
        </ul>
      </div>
      <div>
        <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">
          Services
        </h5>
        <ul class="flex gap-4 flex-wrap justify-center lg:block">
          <li>Consultation</li>
          <li>Training</li>
        </ul>
      </div>
      <div>
        <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">
          Contact
        </h5>
        <ul class="flex gap-4 flex-wrap justify-center lg:block">
          <li class="hover:text-yellow-400">
            <a href="mailto:">vansfieldlifestylemd@gmail.com</a>
          </li>
          <li class="hover:text-yellow-400">
            <a href="tel:">+234 (0) 803 450 0963</a>
          </li>
        </ul>
      </div>
    </footer>
    <div class="bg-teal-900 text-gray-400 text-center p-3">
      Website crafted by
      <a
        href="https://www.simplyroyalty.com"
        target="_blank"
        class="font-serif text-yellow-400"
        >Royalty</a
      >
    </div>
  </div>
</template>

<script setup>
const { status } = useAuthState();
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
// Close menu when clicking outside

const showScrollButton = ref(false);

const handleScroll = (e) => {
  const scrollThreshold = 600; 
  showScrollButton.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  watchEffect(() => {
    const closeMenuHandler = (event) => {
      const dropdown = document.querySelector(".dropdown");
      const header = document.querySelector("header");

      if (!dropdown.contains(event.target) && !header.contains(event.target)) {
        isMenuOpen.value = false;
      }
    };

    document.addEventListener("click", closeMenuHandler);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("click", closeMenuHandler);
    };
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.router-link-active {
  color: teal;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
  z-index: -10;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  z-index: -10;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
  z-index: -10;
}
</style>
