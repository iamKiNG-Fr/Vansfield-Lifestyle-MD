<template>
  <NuxtLoadingIndicator :height="10" color="#008080" />
  <div class="">
    <header
      class="flex relative lg:px-40 px-4 pt-4 pb-8 lg:py-10 py-4 justify-between items-center"
    >
      <EditProfile
        v-if="isShowingEditProfile === true"
        @close-edit-profile="isShowingEditProfile = false"
      />
      <NuxtLink to="/">
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
      <div class="flex gap-5 font-semibold items-center">
        <NuxtLink to="/"> Home </NuxtLink>
        <div
          to="/"
          @click="showAccountMenu = !showAccountMenu"
          ref="accountMenu"
          class="bg-teal-700 p-2 text-gray-100 rounded-md hover:bg-teal-800 transition-colors duration-300 relative cursor-pointer"
        >
          <div class="flex items-center gap-2">
            <UIcon name="material-symbols:person-2" dynamic />
            <span> {{ user.firstName }} {{ user.lastName }}</span>
          </div>
          <div
            class="absolute bg-white shadow-xl right-0 top-14 p-5 w-48 rounded-lg text-gray-700"
            v-if="showAccountMenu"
          >
            <div
              @click="isShowingEditProfile = !isShowingEditProfile"
              class="py-2 border-b-2 flex gap-2 items-center hover:text-teal-700"
            >
              <UIcon name="material-symbols:person-edit-rounded" dynamic />
              <span>Edit Profile</span>
            </div>
            <!-- <div
              class="py-2 border-b-2 flex gap-2 items-center hover:text-teal-700"
            >
              <UIcon name="material-symbols:history-rounded" dynamic />
              <span>Order History</span>
            </div> -->
            <div
              class="py-2 border-b-2 flex gap-2 items-center hover:text-teal-700"
              @click="logout"
            >
              <UIcon name="material-symbols:view-list" dynamic />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="max-w-[1800px] mx-auto p-10">
      <div class="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        <nav
          class="bg-teal-700 rounded-xl p-10 h-[700px] w-auto text-xl flex flex-col justify-between"
        >
          <ul>
            <NuxtLink to="/dashboard/appointments"
              ><li class="flex items-center gap-2 p-2 hover:bg-teal-900 rounded-md">
                <UIcon name="i-heroicons-calendar-days-16-solid" /><span
                  >Appointments</span
                >
              </li></NuxtLink
            >
            <div :class="{ 'bg-teal-800 rounded-md': showShopOptions }">
              <NuxtLink
                ><li
                  class="flex items-center rounded-md gap-2 p-2 cursor-pointer hover:bg-teal-900"
                  @click="showShopOptions = !showShopOptions; if(showShopOptions) showGalleryOptions=false"
                >
                  <UIcon name="i-heroicons-shopping-cart-solid" /><span
                    >Shop</span
                  >
                </li></NuxtLink
              >
              <ul class="pl-5" v-show="showShopOptions">
                <NuxtLink to="/dashboard/addproduct"
                  ><li class="flex items-center gap-2 p-2 hover:bg-teal-900 rounded-md">
                    <UIcon name="i-heroicons-plus-16-solid" /><span
                      >Add Product</span
                    >
                  </li></NuxtLink
                >
                <NuxtLink to="/dashboard/viewproducts"
                  ><li class="flex items-center gap-2 p-2 hover:bg-teal-900 rounded-md">
                    <UIcon name="material-symbols:view-list" dynamic /><span
                      >View Products</span
                    >
                  </li></NuxtLink
                >
              </ul>
            </div>
            <div :class="{ 'bg-teal-800 rounded-md': showGalleryOptions }">
              <div
                class="flex items-center gap-2 p-2 cursor-pointer  rounded-md hover:bg-teal-900"
                @click="showGalleryOptions = !showGalleryOptions; if(showGalleryOptions) showShopOptions=false"
              >
               <UIcon name="i-heroicons-photo-16-solid" />
                <p>Gallery</p>
              </div>
              <ul class="pl-5" v-show="showGalleryOptions">
                <NuxtLink to="/dashboard/gallery"
                  ><li class="rounded-md flex items-center gap-2 p-2 hover:bg-teal-900">
                    <UIcon name="material-symbols:add-photo-alternate-rounded" dynamic/><span
                      >Add Image</span
                    >
                  </li></NuxtLink
                >
                <NuxtLink to="/dashboard/gallery/viewgallery"
                  ><li class="flex rounded-md items-center gap-2 p-2 hover:bg-teal-900">
                    <UIcon name="material-symbols:gallery-thumbnail-rounded" dynamic/><span
                      >View Gallery</span
                    >
                  </li></NuxtLink
                >
              </ul>
            </div>
          </ul>
          <button @click="logout" class="btn text-center">Log Out</button>
        </nav>
        <!-- output page content -->
        <div class="lg:col-span-4 sm:col-span-2">
          <slot />
        </div>
      </div>
    </section>
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

useHead({
  title: "Vansfield Lifestyle MD | Dashboard",
  meta: [{ name: "description", content: "Admin Dashboard" }],
});

const backend = useRuntimeConfig().public.backendUrl;

const { signOut } = useAuth();
const { status, data } = useAuthState();

const showShopOptions = ref(false);
const showAccountMenu = ref(false);
const showGalleryOptions = ref(false)
const accountMenu = ref(null);
const isShowingEditProfile = ref(false);

//user data

const user = data.value;

// Menu

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

const logout = async () => {
  await signOut({ callbackUrl: "/" }); // Call Sidebase's signOut for local session handling
};
</script>
<style scoped>
.router-link-active {
  color: rgb(255, 196, 0);
}
nav {
  color: azure;
}
</style>
