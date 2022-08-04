<template>
  <div
    style="margin-top: -100px"
    class="container grid grid-cols-2 items-center h-screen mx-auto"
  >
    <div class="p-10">
      <h1 class="md:text-8xl text-4xl">Web Chat</h1>
      <p class="text-3xl pr-10 mt-5">
        Create or join a chat room for real-time discussions with friends and
        family about your favorites topics.
      </p>
      <router-link class="btn-primary mt-7" to="/create"
        >Start a room</router-link
      >
    </div>
    <div>
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
