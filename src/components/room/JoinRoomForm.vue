<template>
  <div class="grid md:grid-cols-4 lg:grid-cols-8">
    <div
      class="md:col-start-2 md:col-span-2 lg:col-start-4 lg:col-span-2 md:mx-0 mx-10 my-16"
    >
      <h2 class="text-2xl mb-8 text-center">Join a chat room</h2>
      <div class="space-y-5">
        <div>
          <input
            class="form-input text-input"
            placeholder="Room ID"
            type="text"
            name="roomId"
            id="roomId"
            v-on:input="resetErrors()"
            v-model="formData.roomId.value"
          />
          <small v-if="formData.roomId.error != ''" class="text-red-500">{{
            formData.roomId.error
          }}</small>
        </div>
        <div>
          <input
            class="form-input text-input"
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            v-on:input="resetErrors()"
            v-model="formData.username.value"
          />
          <small v-if="formData.username.error != ''" class="text-red-500">{{
            formData.username.error
          }}</small>
        </div>
        <div>
          <button
            type="button"
            class="btn-primary w-full"
            @click="joinRoom($event)"
          >
            Join now
          </button>
        </div>
        <p class="text-left">
          No room ? <router-link to="/create">Create a room</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        roomId: { value: this.$route.query.id || "", error: "" },
        username: { value: "", error: "" },
      },
    };
  },

  methods: {
    joinRoom(event) {
      event.preventDefault();
      // update user name when joined
      const data = {};
      this.setProperty({ obj: "me", property: "name", value: data.userName });
    },
  },
};
</script>
