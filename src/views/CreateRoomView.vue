<template>
  <div class="container mx-auto">
    <room-create-form v-if="!roomCreated" @created="roomCreated = true" />
    <div v-else></div>
  </div>
</template>

<script>
import RoomCreateForm from "@/components/room/RoomCreateForm.vue";

export default {
  data() {
    return {
      roomCreated: false,
    };
  },

  components: {
    RoomCreateForm,
  },
};
</script>
