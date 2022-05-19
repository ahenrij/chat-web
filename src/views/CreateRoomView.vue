<template>
  <div class="grid place-items-center px-10 py-10">
    <h2 class="text-3xl mt-20 mb-8 text-center">Create a new chat room</h2>
    <div class="space-y-5">
      <div>
        <input
          class="form-input !border-slate-400 block rounded-md p-3 md:p-4"
          placeholder="Username"
          type="text"
          name="name"
          id="name"
          v-on:input="resetErrors()"
          v-model="formData.userName.value"
        />
        <small v-if="formData.userName.error != ''" class="text-red-500">{{
          formData.userName.error
        }}</small>
      </div>
      <div>
        <input
          class="form-input !border-slate-400 block rounded-md p-3 md:p-4"
          placeholder="Room name"
          type="text"
          name="name"
          id="name"
          v-on:input="resetErrors()"
          v-model="formData.roomName.value"
        />
        <small v-if="formData.roomName.error != ''" class="text-red-500">{{
          formData.roomName.error
        }}</small>
      </div>
      <div>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md p-3 md:p-4"
          @click="createRoom($event)"
        >
          Create
        </button>
      </div>
      <p class="text-center">or</p>
      <p class="text-center">
        <router-link to="/join">Join a room</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { getFormData } from "@/utils/form";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        userName: { value: "", error: "" },
        roomName: { value: "", error: "" },
      },
    };
  },

  mounted() {},

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("data", ["makeRequest", "setProperty", "addRoom"]),

    createRoom(event) {
      event.preventDefault();
      const data = getFormData(this.formData);
      if (this.isValid(data)) {
        // update me name
        this.setProperty({ obj: "me", property: "name", value: data.userName });
      }
    },

    /**
     * Make actual post request
     */
    async postRoom(name) {
      console.log(name);
    },

    isValid: function (data) {
      let valid = true;
      if (data.userName === "") {
        this.formData.userName.error = "Champ obligatoire";
        valid = false;
      }
      if (data.roomName === "") {
        this.formData.roomName.error = "Champ obligatoire";
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
  },
};
</script>
