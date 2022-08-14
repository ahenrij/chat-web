<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    joinRoom() {
      // update user name when joined
      const data = {};
      this.setProperty({ obj: "me", property: "name", value: data.userName });
    },
  },
};
</script>
