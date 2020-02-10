<template>
  <div class="eagle-spinner">
    <picture>
          <source srcset="logo.webp" type="image/webp">
          <source srcset="logo.png" type="image/png">
          <img src="logo.png" alt="eagle-logo" :style="style" />
      </picture>
  </div>
</template>

<script>
export default {
    name: 'EagleSpinner',
    props: {
        width: {
            type: Number,
            default: 135
        },
        height: {
            type: Number,
            default: 135
        }
    },
    computed: {
        style: function () {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.eagle-spinner img {
  width: 200px;
  height: 200px;
  animation-name: spin;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-radius: 100%;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
