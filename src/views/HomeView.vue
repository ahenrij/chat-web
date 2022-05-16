<template>
  <div class="home">
    <CreateRoom />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateRoom from "@/components/room/CreateRoom.vue";

export default {
  name: "HomeView",
  components: {
    CreateRoom,
  },
};
</script>
