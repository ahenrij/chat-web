<template>
  <div class="home">
    <JoinRoom />
  </div>
</template>

<script>
// @ is an alias to /src
import JoinRoom from "@/components/room/JoinRoom.vue";

export default {
  name: "RoomView",
  components: {
    JoinRoom,
  },
};
</script>
