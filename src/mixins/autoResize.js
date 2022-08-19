const MAX_SCROLL_HEIGHT = 20 * 5; // 5 lines
const HEIGHT_TO_REMOVE = 16;

function height(scrollHeight) {
  var height = scrollHeight - HEIGHT_TO_REMOVE;
  console.log(height);
  return height > MAX_SCROLL_HEIGHT ? MAX_SCROLL_HEIGHT : height;
}

export default {
  methods: {
    mixin_autoResize_resize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${height(event.target.scrollHeight)}px`;
      event.target.scrollTo(0, event.target.scrollHeight);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.setAttribute(
        "style",
        "height",
        `${height(this.$el.scrollHeight)}px`
      );
    });
  },
};
