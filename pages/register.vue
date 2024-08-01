<template>
    <div class="">
        <div class="bg-[url('/plant.jpg')] w-full h-screen bg-cover flex justify-center items-center">
        <!-- <div> -->
            <form @submit.prevent="register" class="min-w-[350px] p-10 bg-white mt-10 rounded-lg shadow-white shadow-2xl hover:shadow-yellow-400 transition-all duration-500">
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
                    <p class="error w-full" v-if="errorMsg" v-for="message in errorMsg" :key="message">{{ message }}</p>
                </div>
                <p class="font-bold text-3xl text-teal-700 mb-7">Register</p>
                <div class="flex flex-wrap gap-5">

                    <div class="flex flex-col">
                      <label for="" class="font-bold text-lg">First Name</label>
                      <input
                        type="text"
                        placeholder="Enter your First Name"
                        class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                        v-model="firstName" required
                      />
                    </div>
                    <div class="flex flex-col">
                      <label for="" class="font-bold text-lg">Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter your Last Name"
                        class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                        v-model="lastName" required
                      />
                    </div>
                </div>
              <div class="flex flex-col my-5">
                <label for="" class="font-bold text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                  v-model="email" required
                />
              </div>
              <div class="flex flex-wrap gap-5">
                  <div class="flex flex-col">
                    <label for="" class="font-bold text-lg">Password</label>
                    <input
                      :type="isPasswordVisible?'text':'password'"
                      placeholder="Enter your Password"
                      class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                      v-model="password" required
                    />
                    </div>
                  <div class="flex flex-col">
                    <label for="" class="font-bold text-lg">Confirm Password</label>
                    <input
                      :type="isPasswordVisible?'text':'password'"
                      placeholder="Enter your Password"
                      class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                      v-model="password2" required
                    />
                  </div>
              </div>
              <div @click="togglePasswordVisibility" class="flex items-center mt-5 gap-2 ml-3">
                <div class="flex text-2xl text-teal-800 hover:text-teal-400 cursor-pointer">
                    <UIcon v-if="!isPasswordVisible" name="material-symbols:visibility-rounded" dynamic/>
                    <UIcon v-else name="material-symbols:visibility-off-rounded" dynamic/>
                </div>
                <p><span v-if="isPasswordVisible">Hide</span><span v-else>Show</span> Password</p>
              </div>
            <button type="submit" :disabled="isLoading===true" class="btn2 w-full p-3 text-lg mt-7">
                <p v-if="!isLoading">Register</p>
                <UIcon class="animate-spin" name="heroicons:arrow-path-16-solid" dynamic v-else/>
            </button>
              
            <p class="italic mt-4 text-center text-sm">Already have an Account? <NuxtLink class="font-bold text-teal-700 hover:underline" to="/login">Login</NuxtLink></p>
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
    const firstName = ref("")
    const lastName = ref("")
    const password2 = ref("")
    const isLoading = ref(false)
    const isPasswordVisible = ref(false)
    const errorMsg = ref([])

    const { signUp, status } = useAuth()
    const {token, data} = useAuthState()

    const togglePasswordVisibility = () => {
        isPasswordVisible.value = !isPasswordVisible.value
    }

    const clearError = () => {
    setTimeout(() => {
        errorMsg.value = '';
    }, 10000); // Clears the error message after 5 seconds
    };
        
    const register = async() => {
        isLoading.value = true

        const credentials = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            password2: password2.value,
        }

        const timeout = setTimeout(() => {
            isLoading.value = false;
            errorMsg.value.push('Registration taking too long, check your network and Try Again.');
            clearError()
        }, 10000); // Adjust the timeout duration as needed

        try {
            await signUp(credentials, {callbackUrl: '/', redirect: true})
            clearTimeout(timeout);
        } catch (error) {
            clearTimeout(timeout);
            console.log();
            if (error.response) {
                if (error.response.status === 400) {
                    const msgs = []
                    error.response._data.forEach(element => {
                        const msg = element.msg
                        msgs.push(msg)
                    });
                    errorMsg.value = msgs
                }
                if (error.response.status === 409) {
                    errorMsg.value.push(error.response._data.msg);
                }
                clearError()
            }else{
                errorMsg.value.push('Login failed. Please try again.');
                clearError()
            }
        }
        finally {
        isLoading.value = false;
  }
    }
 

</script>
