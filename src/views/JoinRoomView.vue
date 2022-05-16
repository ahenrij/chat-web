<template>
  <div class="home">
    <JoinRoom />
  </div>
</template>

<script>
// @ is an alias to /src
import JoinRoom from "@/components/JoinRoom.vue";

export default {
  name: "JoinRoomView",
  components: {
    JoinRoom,
  },
};
</script>
