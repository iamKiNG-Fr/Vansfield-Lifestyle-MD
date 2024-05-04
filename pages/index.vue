<template>
    <div>
        <main class="w-full flex flex-col items-center">
            <section class="flex flex-col items-center lg:px-20 px-4">
                <h1 class="lg:text-7xl text-5xl font-serif text-center max-w-5xl font-bold">Transform Your Lifestyle, Embrace Wellness!</h1>
                <p class="lg:text-2xl text-lg text-center max-w-5xl my-8">
                    Embark on a transformative journey with Dr. Dozie. Discover personalized health plans, expert consultations, and vibrant living strategies. Your path to wellness begins here!
                </p>
                <div class="relative lg:max-w-lg max-w-xs">
                    <span class="hero-bubble lg:-left-40 left-2 lg:top-96 top-60 z-20">Public Speaking</span>
                    <span class="hero-bubble lg:-right-32 right-6 lg:top-80 top-10 -z-10">Training</span>
                    <span class="hero-bubble lg:-right-24 -right-2 lg:top-40 top-44 lg:-z-10">Consultations</span>
                    <span class="hero-bubble lg:-left-28 left-2 lg:top-48 -top-1 -z-10">Diet Plans</span>
                    <img src="/assets/img/dr.dozie2.png" alt="Image of doctor dozie">
                </div>
            </section>

            <!-- about dr dozie -->
            <section class="flex lg:flex-row flex-col-reverse items-center bg-teal-700 text-gray-100 w-full justify-center lg:gap-20  -mt-72 z-10">
                <img src="/assets/img/dr.dozie.png" alt="Image of doctor dozie" class="lg:max-w-sm max-w-56 lg:mt-10">
                <div class="lg:max-w-2xl p-5 mt-10">
                    <div>
                        <span class="text-2xl mt-10">Get to Know</span>
                        <h2 class="text-5xl font-bold">Dr Ijeoma Dozie</h2>
                    </div>
                    <p class="mt-8 text-lg leading-loose">
                        Dr. Dozie, a beacon of health and vitality, is a <span class="text-yellow-400">seasoned healthcare professional</span> with a passion for holistic well-being. With a wealth of experience and a compassionate approach, Dr. Dozie has touched countless lives, guiding individuals towards <span class="text-yellow-400">optimal health</span> and happiness.
                        <br><br>
                        Her journey began with a <span class="text-yellow-400">deep-rooted commitment to helping</span> others live their best lives. Armed with a comprehensive understanding of medicine and a dedication to continuous learning, Dr. Dozie goes <span class="text-yellow-400">beyond conventional practices</span>, embracing a holistic approach that considers the interconnectedness of mind, body, and spirit.
                    </p>
                </div>
            </section>

            <!-- my services section -->
            <section class="bg-gray-100 w-full flex flex-col lg:py-24 py-10">
                <header class="lg:px-20 px-10 lg:mb-20 mb-10">
                    <h3 class="font-bold text-3xl">+ My Services</h3>
                    <p class="text-lg italic">Lets begin your health journey with</p>
                </header>
                <div class="lg:px-16 px-5 flex justify-center gap-36 items-center">
                    <ul class="flex flex-col gap-10">
                        <li class="service-card group">
                            <img src="/assets/img/consult.svg" alt="consultaion icon" class="lg:w-20 w-16 group-hover:invert transition ease-in-out duration-700">
                            <div class="ml-5">
                                <h4 class="text-xl font-bold uppercase">consultaion</h4>
                                <p class="text-sm italic">Speak to your doctor from anywhere</p>
                            </div>
                        </li>
                        <li class="service-card group">
                            <img src="/assets/img/train.svg" alt="training icon" class="lg:w-20 w-16 filter invert group-hover:invert-0 transition ease-in-out duration-700 ">
                            <div class="ml-5">
                                <h4 class="text-xl font-bold uppercase">training</h4>
                                <p class="text-sm italic">Fitness is key, Lets get you fit.</p>
                            </div>
                        </li>
                        <li class="service-card group">
                            <img src="/assets/img/conference.svg" alt="diagnosis icon" class="lg:w-20 w-16 group-hover:invert transition ease-in-out duration-700">
                            <div class="ml-5">
                                <h4 class="text-xl font-bold uppercase">Speaking Engagement</h4>
                                <p class="text-sm italic">Learn about Public Speaker</p>
                            </div>
                        </li>
                    </ul>
                    <div class="max-w-2xl hidden lg:block">
                        <div>
                            <h4 class="text-5xl font-extrabold">Consultations</h4>
                            <span>with Dr. Dozie</span>
                        </div>
                        <p class="text-lg leading-relaxed mt-8">
                            Meet Dr. Dozie, your trusted online healthcare companion. With virtual consultations, Dr. Dozie brings expert medical guidance right to your fingertips. 
                            <br><br>
                            Whether you're seeking advice on a specific issue or simply need a check-up, Dr. Dozie offers convenient, confidential consultations from the comfort of your own home. Take control of your health today and schedule your online consultation with Dr. Dozie.
                        </p>
                    </div>
                </div>
            </section>
            <HomeCarousel />
            <!-- Products -->
            <section class="bg-teal-700 w-full flex flex-col lg:py-24 py-10">
                <header class="text-gray-100 lg:px-20 px-10 lg:mb-20 mb-10">
                    <h3 class="font-bold text-3xl">+ Products</h3>
                    <span class="text-lg italic">Sustain your health journey with</span>
                </header>
                <div class="flex flex-col lg:flex-row lg:px-16 px-10 gap-10 lg:justify-center items-center">
                    <div class="product-card">
                        <img src="/assets/img/hplans.png" alt="health plan image" class="rounded-md mx-auto">
                        <h4 class="font-bold text-2xl my-3">Health Plan</h4>
                        <p>
                            Discover optimal health with 
                            Dr. Dozie's personalized plans.
                            Your journey to wellness 
                            begins here.
                        </p>
                    </div>
                    <div class="product-card">
                        <img src="/assets/img/books.png" alt="Books image" class="rounded-md mx-auto">
                        <h4 class="font-bold text-2xl my-3">Books</h4>
                        <p>
                            Dive into a world of knowledge 
                            with Dr. Dozie's curated selection
                            of health and welln ess books.
                        </p>
                    </div>
                    <div class="product-card">
                        <img src="/assets/img/wloss.png" alt="diet plan image" class="rounded-md mx-auto">
                        <h4 class="font-bold text-2xl my-3">Weight Loss Plan</h4>
                        <p>
                            Elevate your nutrition with 
                            Dr. Dozie's custom diet plans, 
                            tailored for your unique 
                            health goals and lifestyle.
                        </p>
                    </div>
                </div>
            </section>

            <!-- testimonials -->
            <section class="w-full flex flex-col lg:py-24 py-10">
                <header class="lg:px-20 px-10 lg:mb-20 mb-10">
                    <h3  class="font-bold text-3xl">+ Testimonials</h3>
                    <span class="text-lg italic">Reviews from clients</span>
                </header>
                <div class="testimonial-cards">
                    <div class="testimonial-card">
                        <div class="flex items-center">
                            <img src="/assets/img/pngegg.png" alt="profile image" class="w-16 rounded-full">
                            <div class="ml-5">
                                <p class="font-bold text-xl">Sarah Doe</p>
                                <div class="flex gap-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                </div>
                            </div>
                        </div>
                        <h4 class="font-bold text-lg my-5">Life-Changing Experience!</h4>
                        <p class="text-base leading-relaxed">
                            Dr. Dozie's guidance transformed my health journey. 
                            Personalized plans and expert advice helped me
                            achieve my goals. Highly recommend!
                        </p>
                    </div>
                    <div class="testimonial-card">
                        <div  class="flex items-center">
                            <img src="/assets/img/profile.png" alt="profile image" class="w-16 rounded-full">
                            <div class="ml-5">
                                <p class="font-bold text-xl">Michael Shu</p>
                                <div class="flex gap-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                </div>
                            </div>
                        </div>
                        <h4 class="font-bold text-lg my-5">Expertise Beyond Expectations</h4>
                        <p>
                            Dr. Dozie's knowledge and care exceeded all expectations. I've seen remarkable improvements in my well-being. Grateful beyond words.
                        </p>
                    </div>
                    <div class="testimonial-card" >
                        <div class="flex items-center">
                            <img src="/assets/img/pngegg.png" alt="profile image" class="w-16 rounded-full">
                            <div class="ml-5">
                                <p class="font-bold text-xl">Emily Ada</p>
                                <div class="flex gap-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                </div>
                            </div>
                        </div>
                        <h4 class="font-bold text-lg my-5">A Trusted Companion</h4>
                        <p>
                            Dr. Dozie's personalized approach and genuine concern make her invaluable. With her support, I've achieved balance and vitality. Forever grateful!
                        </p>
                    </div>
                    <div class="testimonial-card">
                        <div  class="flex items-center">
                            <img src="assets/img/profile.png" alt="profile image" class="w-16 rounded-full">
                            <div class="ml-5">
                                <p class="font-bold text-xl">David Ayo</p>
                                <div class="flex gap-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                    <img src="/assets/img/star.svg" alt="star" width="18px" class="mt-2">
                                </div>
                            </div>
                        </div>
                        <h4 class="font-bold text-lg my-5">Wellness Made Simple</h4>
                        <p>
                            Her Consultations simplified my wellness journey. Clear guidance and encouragement have made all the difference. Highly recommended for all!
                        </p>
                    </div>
                </div>
            </section>

            <!-- newsletter -->
            <form id="newsletter" class="bg-teal-800 bg-[url('/assets/img/dcphands.png')] bg-no-repeat bg-cover px-10 py-10 rounded-3xl w-5/6 flex flex-col items-center">
                <header class="flex flex-col lg:max-w-3xl text-center justify-center">
                    <h3 class="text-gray-100 lg:text-5xl text-2xl font-bold">Begin your <span class="text-yellow-500">Healthy Lifestyle</span> Journey Here!</h3>
                    <p class="pt-5 text-xl text-gray-100">Join my Email list to stay updated.</p>
                </header>
                <div class="mt-10 box-border flex lg:flex-row flex-col gap-5">
                    <input type="text" class="lg:w-96 w-60 bg-gray-100 text-2xl rounded-md p-2">
                    <button class="bg-yellow-400 text-xl font-bold py-2 px-4 rounded-md hover:bg-yellow-300">Join</button>
                </div>
            </form>
        </main>
    </div>
</template>

<script setup>
    useHead({
        title: 'Vansfield Lifestyle MD',
        meta: [
            {name: 'description', content: 'Embark on a transformative journey with Dr. Dozie. Discover personalized health plans, expert consultations, and vibrant living strategies. Your path to wellness begins here!'}
        ]
    })
</script>

<style scoped>

</style>