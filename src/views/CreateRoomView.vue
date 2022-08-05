<template>
  <div class="container mx-auto">
    <div class="grid md:grid-cols-4 lg:grid-cols-6">
      <div
        class="md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-2 md:mx-0 mx-10 mb-20"
      >
        <h2 class="text-2xl mt-20 mb-8 text-center">Create a new chat room</h2>
        <div class="space-y-5">
          <div>
            <input
              class="form-input text-input"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              v-on:input="resetErrors()"
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
              id="description"
              v-on:input="resetErrors()"
              v-model="formData.description.value"
            ></textarea>
            <small
              v-if="formData.description.error != ''"
              class="text-red-500"
              >{{ formData.description.error }}</small
            >
          </div>
          <div>
            <vue-tags-input
              class="form-input text-input"
              v-model="tag"
              :tags="formData.tags.value"
              @tags-changed="(newTags) => (formData.tags.value = newTags)"
            />
            <small
              v-if="formData.description.error != ''"
              class="text-red-500"
              >{{ formData.description.error }}</small
            >
          </div>
          <div>
            <input
              class="form-input text-input"
              placeholder="Application context"
              type="text"
              name="context"
              id="context"
              v-on:input="resetErrors()"
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
              v-on:input="resetErrors()"
              v-model="formData.context.value"
            />
            <small v-if="formData.context.error != ''" class="text-red-500">{{
              formData.context.error
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
          <p class="text-center">or</p>
          <p class="text-center">
            <router-link to="/join" class="btn-white w-full"
              >Join a room</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@sipec/vue3-tags-input";
import { getFormData } from "@/utils/form";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
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
      if (data.name === "") {
        this.formData.name.error = "Champ obligatoire";
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

  components: {
    VueTagsInput,
  },
};
</script>
