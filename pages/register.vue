<template>
    <div class="">
        <div class="bg-[url('/plant.jpg')] w-full h-full sm:h-screen bg-cover bg- flex justify-center sm:items-center">
        <!-- <div> -->
            <form class="w-[350px] sm:w-auto h-fit p-10 bg-white my-10 rounded-lg shadow-white shadow-2xl transition-all duration-500">
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
                    <p class="success w-full" v-if="successMsg">{{ message }}</p>
                </div>
                <div class="flex flex-col gap-5" v-if="registrationStep===1">
                    <p class="font-bold text-3xl text-teal-700">Register - <span class="font-bold text-xl text-teal-700 mb-7">Basic Details</span></p>
                    
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
                    <div class="flex flex-wrap gap-5">
                        <div class="flex flex-col">
                          <label for="" class="font-bold text-lg">Email</label>
                          <input
                            type="email"
                            placeholder="Enter your Email"
                            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                            v-model="email" required
                          />
                        </div>
                        <div class="flex flex-col">
                          <label for="" class="font-bold text-lg">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="Enter your Phone Number"
                            class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                            v-model="phoneNumber" required
                          />
                        </div>
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
                  
                    <button @click="register" :disabled="isLoading===true" class="btn2 w-full p-3 text-lg mt-7">
                        <p v-if="!isLoading">Register</p>
                        <UIcon class="animate-spin" name="heroicons:arrow-path-16-solid" dynamic v-else/>
                    </button>
                        <p class="italic mt-4 text-center text-sm">Already have an Account? <NuxtLink class="font-bold text-teal-700 hover:underline" to="/login">Login</NuxtLink></p>
            
              
                </div>
                <div class="flex flex-col gap-5 " v-if="registrationStep===2">
                    <h2 class="font-bold text-3xl text-teal-700 mb-7">Register - <span class="font-bold text-xl text-teal-700 mb-7">Verify E-mail</span></h2>
                    <p class="text-center">A One-Time Pin (OTP) has been sent to your email <br> Kindly enter the number to verify your E-mail</p>
                    <div class="flex flex-wrap justify-center flex-col gap-5">
                        <div class="flex flex-col">
                            <label for="" class="font-bold text-lg text-center">Enter OTP</label>
                            <input
                                type="number"
                                min="1000"
                                max="9999"
                          
                                class="bg-white px-5 pt-3 pb-1 border-b-4 text-center border-teal-700 focus:border-yellow-400 font-medium text-lg"
                                v-model="otp" required
                            />
                        </div>
                        <button class="btn2 w-full p-3 text-lg mt-7" @click="verifyOTP">
                            <p v-if="!isLoading">Verify</p>
                            <UIcon class="animate-spin" name="heroicons:arrow-path-16-solid" dynamic v-else/>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-5 " v-if="registrationStep===3">
                    <h2 class="font-bold text-3xl text-teal-700 mb-7">Welcome - <span class="font-bold text-xl text-teal-700 mb-7">Verification Success</span></h2>
                    <p class="text-center">Welcome to Vansfield Lifestyle MD <br>You have been verified and can now Login</p>
                        <NuxtLink to="/" class="btn2 w-full p-3 text-lg mt-7">Login</NuxtLink>
                </div>
         
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

    const backend = useRuntimeConfig().public.backendUrl;

    const email = ref("")
    const password = ref("")
    const firstName = ref("")
    const lastName = ref("")
    const phoneNumber = ref("")
    const password2 = ref("")
    const otp = ref("")
    const userId = ref("")
    const isLoading = ref(false)
    const isPasswordVisible = ref(false)
    const errorMsg = ref([])
    const successMsg = ref("")
    const registrationStep = ref(1)

    const togglePasswordVisibility = () => {
        isPasswordVisible.value = !isPasswordVisible.value
    }

    const clearError = () => {
    setTimeout(() => {
        errorMsg.value = '';
    }, 10000); // Clears the error message after 5 seconds
    };

    const verifyOTP = async() => {

        isLoading.value = true

        const otpDetails = {
            otp: otp.value,
            userId: userId.value
        }

        const response = await $fetch(`${backend}/api/auth/verifyOTP`, {
            method: "post",
            body: otpDetails
        })
        
        
        if (response.status == "Verified") {
            registrationStep.value = 3
            successMsg.value.push(response.msg)
            clearError()
        }

    }
        
    const register = async() => {
        isLoading.value = true

        const credentials = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value,
            password2: password2.value,
        }

        const timeout = setTimeout(() => {
            isLoading.value = false;
            errorMsg.value.push('Registration taking too long, Please wait.');
            clearError()
        }, 10000); // Adjust the timeout duration as needed

        try {

            const response = await $fetch(`${backend}/api/auth/register`, {
             method: "post",
             body: credentials
            })

            console.log(response);
            
            userId.value = response.data.userId

            registrationStep.value = 2
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
