<template>
  <div class="grid place-items-center mt-20 mx-auto">
    <div
      class="shadow-lg bg-slate-50 rounded-md !self-center md:w-1/2 lg:w-2/5 p-10 border-red-600"
    >
      <p class="text-2xl text-blue-500 mb-3">Room created</p>
      <p class="mt-7">
        Copy and share the <b>Room ID</b> below to allow people to join your
        newly created room for conversation.
      </p>
      <p class="copy h-12 my-5 bg-slate-100 p-3 font-bold rounded-sm">
        {{ id }}
        <svg
          class="h-6 w-6 float-right invisible cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="copyIdToClipboard"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </p>
      <router-link
        class="btn-primary float-right"
        :to="{ name: 'join', query: { id: id } }"
      >
        Join room</router-link
      >
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "@/utils/func";

export default {
  props: {
    id: {
      type: String,
      defaultsTo: "",
    },
  },

  methods: {
    copyIdToClipboard() {
      copyToClipboard(this.id).then(
        () => {
          this.$notify(
            {
              group: "generic",
              text: "Copied!",
            },
            2000
          );
        },
        (error) => {
          this.$notify(
            {
              group: "error",
              title: "Error",
              text: "Sorry, unable to copy the ID",
            },
            2000
          );
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.copy:hover > * {
  visibility: visible !important;
}
</style>
