<template>
    <div class="">
        <div class="bg-[url('/plant.jpg')] w-full h-screen bg-cover flex justify-center items-center">
        <!-- <div> -->
            <form @submit.prevent="login" class="w-[350px] p-10 bg-white mt-10 rounded-lg shadow-white shadow-2xl hover:shadow-yellow-400 transition-all duration-500">
                <NuxtLink to="/" class="flex justify-between items-center mb-8">
                    <div class="flex items-center">
                        <div>
                            <img src="/assets/img/vansfield-logo.png" alt="Vansfield Lifestyle MD logo" class="w-12">
                        </div>
                        <span class="ml-3 font-serif lg:text-lg uppercase lg:gap-2">
                            <div><span class="lg:text-xl text-xl">V</span class="lg:text-sm">ansfield</div> 
                            <div>
                                <span class="lg:text-xl text-xl">L</span class="lg:text-sm">ifestyle <span class="lg:text-xl text-xl">MD</span>
                            </div>
                        </span>
                    </div>
                    <UIcon name="material-symbols:close-rounded" class="text-2xl hover:text-red-400" dynamic/>
                </NuxtLink>
                <p class="error md:hidden">We recommend you login on a computer</p>
                <div class="w-full">
                    <p class="error w-full" v-if="errorMsg">{{ errorMsg }}</p>
                </div>
              <div class="flex flex-col">
                <label for="" class="font-bold text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                  v-model="email" required
                />
              </div>
              <div class="flex flex-col pt-8">
                <label for="" class="font-bold text-lg">Password</label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                  v-model="password" required
                />
              </div>
            <button type="submit" :disabled="isLoading===true" class="btn2 w-full p-3 text-lg mt-7">
                <p v-if="!isLoading">Login</p>
                <UIcon class="animate-spin" name="heroicons:arrow-path-16-solid" dynamic v-else/>
            </button>
              
            <p class="italic mt-4 text-center text-sm">Don't have an Account? <NuxtLink class="font-bold text-teal-700 hover:underline" to="/register">Register</NuxtLink></p>
            </form>
        <!-- </div> -->
    </div>
    </div>
</template>

<script setup>

    definePageMeta({
        layout: false,
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard/appointments'
        }
    })
    useHead({
        title: 'Vansfield Lifestyle MD | Login',
    })

    const email = ref("")
    const password = ref("")
    const isLoading = ref(false)
    const errorMsg = ref("")

    const { signIn, status } = useAuth()
    const {token, data} = useAuthState()


const clearError = () => {
  setTimeout(() => {
    errorMsg.value = '';
  }, 5000); // Clears the error message after 5 seconds
};
    
    const login = async() => {
        isLoading.value = true

        const credentials = {
            email: email.value,
            password: password.value
        }

        const timeout = setTimeout(() => {
            isLoading.value = false;
            errorMsg.value = 'Login taking too long, check your network.';
        clearError()
        }, 10000); // Adjust the timeout duration as needed

        try {
            await signIn(credentials, {callbackUrl: '/'})
            clearTimeout(timeout);
            clearError()
        } catch (error) {

            clearTimeout(timeout);
            if (error.response.status === 401) {
                errorMsg.value = "Invalid Login details";
                clearError()
            }else{
                errorMsg.value = 'Login failed. Please try again.';
                clearError()
            }

        }
        finally {
        isLoading.value = false;
  }
    }
 

</script>
