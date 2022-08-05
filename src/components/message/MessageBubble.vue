<template>
  <div class="message-bubble" :class="me">
    <span class="from" :class="me"></span>
    <br :class="me" />
    <span class="message-text"></span>
  </div>
</template>
<script>
export default {
  name: "message-bubble",

  data() {
    return {};
  },

  props: ["uuid", "text"],

  computed: {
    me() {
      let result = false;

      // Check if the client uuid of the message received is your client uuid
      if (this.$store.getters.get("me").uuid === this.uuid) {
        result = true;
      }

      // Render the message bubble on the right side if it is from this client
      return result ? "me" : "";
    },
  },
};
</script>
