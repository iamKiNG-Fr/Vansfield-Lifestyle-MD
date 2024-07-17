<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      id="newsletter"
      class="bg-teal-800 bg-[url('/assets/img/dcphands.png')] bg-no-repeat bg-cover px-10 py-10 rounded-3xl w-5/6 flex flex-col items-center mx-auto"
    >
      <header class="flex flex-col lg:max-w-3xl text-center justify-center">
        <h3 class="text-gray-100 lg:text-5xl text-2xl font-bold">
          Begin your
          <span class="text-yellow-500">Healthy Lifestyle</span> Journey Here!
        </h3>
        <p class="pt-5 text-xl text-gray-100">
          Join my Email list to stay updated.
        </p>
      </header>
      <p v-if="responseMsg" class="mt-5 text-lg text-yellow-400">
        * {{ responseMsg }}
      </p>
      <div class="mt-5 box-border flex lg:flex-row flex-col gap-5">
        <input
          type="text"
          class="lg:w-96 w-60 bg-gray-100 text-base rounded-md p-2 "
          v-model="name"
          placeholder="What's your Name?"
          required
          autocomplete="name"
        />
        <input
          type="email"
          class="lg:w-96 w-60 bg-gray-100 text-base rounded-md p-2"
          v-model="email"
          placeholder="What's your Email?"
          required
          autocomplete="email"
        />
        <button
          class="bg-yellow-400 text-xl font-bold py-2 px-4 rounded-md hover:bg-yellow-300"
        >
          Join
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const responseMsg = ref(null);

const selectedService = ref(1); // Set default to 1 for Div 1 info

onBeforeMount(async () => {
  await $fetch(`https://vansfield-lifestyle-md-be.onrender.com`, {
    method: "GET",
  });
});

const handleSubmit = async () => {
  try {
    const response = await $fetch(
      `https://vansfield-lifestyle-md-be.onrender.com/newsletter`,
      { method: "POST", body: { name: name.value, email: email.value } }
    );
    // console.log(data);
    responseMsg.value = response.message;
    // console.log(response.message);
    // console.log(`hmm${responseMsg}`);
    setTimeout(() => {
      responseMsg.value = "";
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};
</script>
