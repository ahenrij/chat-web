<template>
  <div class="grid md:grid-cols-4 lg:grid-cols-6">
    <div
      class="md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-2 md:mx-0 mx-10 my-16"
    >
      <h2 class="text-2xl mb-8 text-center">Create a new chat room</h2>
      <div class="space-y-5">
        <div>
          <input
            class="form-input text-input"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            v-on:input="$form.resetErrors(formData)"
            v-model="formData.name.value"
          />
          <small v-if="formData.name.error != ''" class="text-red-500">{{
            formData.name.error
          }}</small>
        </div>
        <div>
          <textarea
            class="form-input text-input"
            placeholder="Description"
            type="text"
            name="description"
            rows="1"
            id="description"
            v-on:input="$form.resetErrors(formData)"
            v-model="formData.description.value"
          ></textarea>
          <small v-if="formData.description.error != ''" class="text-red-500">{{
            formData.description.error
          }}</small>
        </div>
        <div>
          <vue-tags-input
            class="form-input text-input"
            v-model="tag"
            :tags="formData.tags.value"
            @tags-changed="(newTags) => (formData.tags.value = newTags)"
          />
          <small v-if="formData.description.error != ''" class="text-red-500">{{
            formData.description.error
          }}</small>
        </div>
        <div>
          <input
            class="form-input text-input"
            placeholder="Application context"
            type="text"
            name="context"
            id="context"
            v-on:input="$form.resetErrors(formData)"
            v-model="formData.context.value"
          />
          <small v-if="formData.context.error != ''" class="text-red-500">{{
            formData.context.error
          }}</small>
        </div>
        <div>
          <input
            class="form-input text-input"
            placeholder="Reference ID"
            type="text"
            name="refId"
            id="refId"
            v-on:input="$form.resetErrors(formData)"
            v-model="formData.refId.value"
          />
          <small v-if="formData.refId.error != ''" class="text-red-500">{{
            formData.refId.error
          }}</small>
        </div>
        <div>
          <button
            type="button"
            class="btn-primary w-full"
            @click="createRoom($event)"
          >
            Create
          </button>
        </div>
        <p class="text-left">
          Invited? <router-link to="/join">Join a room</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@sipec/vue3-tags-input";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Room Creation",
      tag: "",
      formData: {
        name: { value: "", error: "" },
        description: { value: "", error: "" },
        tags: { value: [], error: "" },
        context: { value: "", error: "" },
        refId: { value: "", error: "" },
      },
    };
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("data", ["makeRequest"]),

    /**
     * Create a new chat room using form data
     * @param {*} event
     */
    createRoom: function (event) {
      event.preventDefault();
      const data = this.$form.getFormData(this.formData);
      if (this.isValid(data)) {
        // Fixing some values
        data.isPrivate = false;
        data.tags = data.tags.map((t) => t.text.trim());
        this.postData(data);
      }
    },

    /**
     * Make actual post request
     */
    postData: async function (room) {
      const payload = {
        requestData: { method: "post", url: "/room", data: room },
        commit: false,
      };
      const createdRoom = await this.makeRequest(payload);

      if (!createdRoom) {
        this.$toastError(this.title, this.get("loadingError"));
        return;
      }

      // room is successfully created
      this.$form.setFormData(this.formData, null);
      this.$emit("created", createdRoom.id);
    },

    isValid: function (data) {
      let valid = true;
      if (data.name === "") {
        this.formData.name.error = "Mandatory field";
        valid = false;
      }
      return valid;
    },
  },

  components: {
    VueTagsInput,
  },
};
</script>
