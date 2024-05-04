<template>
    <div class="">
        <header class="flex lg:px-40 px-4 pt-4 pb-8 lg:py-10 py-4 justify-between items-center">
            <NuxtLink to="/">
                <div class="flex items-center">
                    <div>
                        <img src="/assets/img/vansfield-logo.png" alt="Vansfield Lifestyle MD logo" class="w-16">
                    </div>
                    <span class="ml-3 font-serif lg:text-lg uppercase"><span class="lg:text-2xl text-xl">V</span>ansfield <span class="lg:text-2xl text-xl">L</span>ifestyle <span class="lg:text-2xl text-xl">MD</span></span>
                </div>
            </NuxtLink>
            <nav>
                <NuxtLink to="#newsletter"><button class="btn">Join Newsletter</button></NuxtLink>
            </nav>
        </header>
        <!-- output page content -->
        <div>
            <slot />
        </div>
        <footer class="bg-teal-700 text-gray-100 grid lg:grid-cols-4 grid-cols-1 justify-items-center lg:grid-rows-1 grid-rows-4 py-16 lg:px-32 px-10 lg:mt-28 mt-10">
            <header>
                <img src="/assets/img/vansfield-logo.png" alt="logo" class="mx-auto mb-4">
                <h4 class="uppercase text-lg mb-8 font-serif text-center">Vansfield Lifestyle MD</h4>
            </header>
            <div>
                <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">Coming soon</h5>
                <ul class="flex gap-4 flex-wrap justify-center lg:block">
                    <li>Blog</li>
                    <li>Shop</li>
                    <li>Books</li>
                    <li>Health Plans</li>
                </ul>
            </div>
            <div>
                <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">Services</h5>
                <ul class="flex gap-4 flex-wrap justify-center lg:block">
                    <li>Consultation</li>
                    <li>Training</li>
                </ul>
            </div>
            <div>
                <h5 class="uppercase text-lg font-bold mb-4 text-center lg:text-left">Contact</h5>
                <ul class="flex gap-4 flex-wrap justify-center lg:block">
                    <li class="hover:text-yellow-400"><a href="mailto:">info@vansfieldlifestylemd.com</a></li>
                    <li class="hover:text-yellow-400"><a href="tel:">+234 (0) 80 000 0000</a></li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    /* .router-link-exact-active{
        color: aqua;
    } */
</style>