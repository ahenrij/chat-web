<template>
  <div class="container mx-auto">
    <create-room-form v-if="!roomCreated" @created="onRoomCreated" />
    <create-room-confirmation :id="createdRoomId" v-else />
  </div>
</template>

<script>
import CreateRoomForm from "@/components/room/CreateRoomForm.vue";
import CreateRoomConfirmation from "@/components/room/CreateRoomConfirmation.vue";

export default {
  data() {
    return {
      roomCreated: false,
      createdRoomId: "bz77ud7ibuedh46zevdlal24567",
    };
  },

  methods: {
    onRoomCreated(roomId) {
      this.roomCreated = true;
      this.createdRoomId = roomId;
    },
  },

  components: {
    CreateRoomForm,
    CreateRoomConfirmation,
  },
};
</script>
