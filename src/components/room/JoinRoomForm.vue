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
            @click="join($event)"
          >
            Join now
          </button>
        </div>
        <p class="text-left">
          No room? <router-link to="/create">Create a room</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormData, setFormData } from "@/utils/form";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Join room",
      formData: {
        roomId: { value: this.$route.query.id || "", error: "" },
        username: { value: "", error: "" },
      },
    };
  },

  computed: {
    ...mapGetters("data", ["get"]),
    ...mapGetters("loading", ["loadingError"]),
  },

  methods: {
    ...mapActions("data", ["setProperty"]),
    ...mapActions("room", ["joinRoom"]),

    join: function (event) {
      event.preventDefault();
      // update user name when joined
      const data = getFormData(this.formData);
      if (this.isValid(data)) {
        this.postData(data);
      }
    },

    /**
     * Make actual post request
     */
    postData: async function (data) {
      // Fix body for web socket request
      data.user = { ...this.get("me") };
      data.user.name = data.username;
      delete data.username;

      const room = await this.joinRoom(data);

      if (!room) {
        this.toast(
          "error",
          this.title,
          this.loadingError
            ? this.loadingError
            : "Oops ! Something wrong happened"
        );
        return;
      }
      // room is joined successfully
      this.setProperty({ obj: "me", property: "name", value: data.user.name });
      setFormData(this.formData, null);
      this.$router.push({ name: "room" });
    },

    isValid: function (data) {
      let valid = true;
      if (data.roomId === "") {
        this.formData.roomId.error = "Mandatory field";
        valid = false;
      }
      if (data.username === "") {
        this.formData.username.error = "Mandatory field";
        valid = false;
      }
      return valid;
    },

    resetErrors: function () {
      // eslint-disable-next-line no-unused-vars
      for (const [_, value] of Object.entries(this.formData)) {
        value.error = "";
      }
    },

    toast: function (type, title, message, duration = 2000) {
      this.$notify({ group: type, title: title, text: message }, duration);
    },
  },
};
</script>
