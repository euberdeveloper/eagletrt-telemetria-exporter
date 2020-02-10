<template>
  <div class="eagle-spinner">
    <b-button variant="outline-primary" :disabled="disabled" @click="eagleClick()">{{text}}</b-button>
  </div>
</template>

<script>
export default {
  name: "EagleButton",
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    eagleClick() {
      if (!this.disabled) {
        this.$emit("eagleClick");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-outline-primary {
  border-color: #ffec00 !important;
  color: #ffec00 !important;
}
.btn-outline-primary:hover {
  background: #ffec00 !important;
  color: #000000 !important;
  font-weight: bold !important;
}
.disabled:hover {
  border-color: #ffec00 !important;
  color: #ffec00 !important;
  background: #000000 !important;
  font-weight: normal !important;
}
</style>
