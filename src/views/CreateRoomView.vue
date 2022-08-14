<template>
  <div class="container mx-auto">
    <room-create-form v-if="!roomCreated" @created="onRoomCreated" />
    <room-create-confirm :id="createdRoomId" v-else />
  </div>
</template>

<script>
import RoomCreateForm from "@/components/room/RoomCreateForm.vue";
import RoomCreateConfirm from "@/components/room/RoomCreateConfirm.vue";

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
    RoomCreateForm,
    RoomCreateConfirm,
  },
};
</script>
