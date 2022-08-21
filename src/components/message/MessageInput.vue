<template>
  <textarea
    ref="input"
    class="form-input text-input"
    placeholder="Type a message"
    maxlength="20000"
    rows="1"
    :value="value"
    @input="
      $emit('update:value', $event.target.value);
      mixin_autoResize_resize($event);
    "
    @keydown.enter.exact.prevent
    @keyup.enter.exact="enterPressed"
    @keydown.enter.shift.exact="newLine"
    v-debounce:2s="fireStoppedTyping"
    v-debounce:300ms="fireTyping"
    debounce-events="keydown"
  ></textarea>
</template>

<script>
import mixinAutoResize from "@/mixins/autoResize.js";
import { mapGetters, mapActions } from "vuex";
import { vue3Debounce } from "vue-debounce";

export default {
  mixins: [mixinAutoResize],

  directives: {
    debounce: vue3Debounce({ lock: true }),
  },

  props: {
    value: String,
    room: Object,
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  data() {
    return {
      rows: 1,
    };
  },

  methods: {
    ...mapActions("roomSocket", ["typing", "stoppedTyping"]),

    newLine: function (event) {
      event.preventDefault();
      const updatedValue = `${event.target.value}\n`;
      this.$refs.input.value = updatedValue;
      this.$emit("update:value", updatedValue);
      this.mixin_autoResize_resize(event);
    },

    enterPressed: function () {
      this.$emit("enter");
    },

    fireTyping: async function () {
      const payload = {
        roomId: this.room.id,
        user: this.get("me"),
      };
      await this.typing(payload);
    },

    fireStoppedTyping: async function () {
      await this.stoppedTyping(this.room.id);
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-input {
  @apply py-2 rounded-md bg-white !border-white resize-none text-sm placeholder:text-slate-400 box-content;
  @apply selection:bg-blue-500 selection:text-white;
}

.form-input {
  @apply !min-w-max w-full;
}
</style>
