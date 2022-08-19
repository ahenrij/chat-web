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
  ></textarea>
</template>

<script>
import mixinAutoResize from "@/mixins/autoResize.js";

export default {
  mixins: [mixinAutoResize],
  props: {
    value: String,
  },
  data() {
    return {
      rows: 1,
    };
  },
  methods: {
    newLine(event) {
      event.preventDefault();
      const updatedValue = `${event.target.value}\n`;
      this.$refs.input.value = updatedValue;
      this.$emit("update:value", updatedValue);
      this.mixin_autoResize_resize(event);
    },
    enterPressed() {
      this.$emit("enter");
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-input {
  @apply py-2 rounded-md bg-white !border-white resize-none text-sm placeholder:text-slate-400 box-content;
}

.form-input {
  @apply !min-w-max w-full;
}
</style>
