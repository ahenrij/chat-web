<template>
  <div
    class="container items-center h-screen mx-auto -mt-24 px-8 pt-10 md:grid md:grid-cols-2"
  >
    <div class="px-10 pt-28 md:p-2">
      <h1 class="md:text-5xl lg:text-8xl text-4xl">Web Chat</h1>
      <p class="text-xl pt-5 lg:text-3xl !leading-normal pr-10">
        Create or join a chat room for real-time discussions with friends and
        family about your favorites topics.
      </p>
      <router-link class="btn-primary mt-7" to="/create">
        Start a room</router-link
      >
    </div>
    <div class="p-10 md:p-0">
      <img src="@/assets/img/undraw_quick_chat.svg" alt="" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
};
</script>
