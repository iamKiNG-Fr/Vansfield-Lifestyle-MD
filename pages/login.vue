<template>
    <div class="">
        <div class="bg-[url('/plant.jpg')] w-full h-screen bg-cover flex justify-center items-center">
        <div>
            <form @submit.prevent="login" class="p-10 bg-white mt-10 inline-block rounded-lg shadow-white shadow-2xl hover:shadow-yellow-400 transition-all duration-500">
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
                <p class="text-red-400 italic pb-5  md:hidden">We recommend you login on a computer</p>
              <div class="flex flex-col">
                <label for="" class="font-bold text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                  v-model="email"
                />
              </div>
              <div class="flex flex-col pt-8">
                <label for="" class="font-bold text-lg">Password</label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  class="bg-white px-5 pt-3 pb-1 border-b-4 border-teal-700 focus:border-yellow-400 font-medium text-lg"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn2 w-full p-3 text-lg mt-7">Login</button>
              
            </form>
        </div>
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

    const { signIn, status } = useAuth()
    const {token, data} = useAuthState()
    
    const login = async() => {

        const credentials = {
            email: email.value,
            password: password.value
        }

        try {
            await signIn(credentials, {callbackUrl: '/dashboard/appointments'})
            console.log('Auth status:', status.value); 
            console.log(data.value);
        } catch (error) {
            console.error(error)
        }

    }
 

</script>
