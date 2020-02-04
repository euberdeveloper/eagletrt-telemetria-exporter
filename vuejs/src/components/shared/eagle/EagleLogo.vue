<template>
  <div class="eagle-logo">
      <picture :style="style">
          <source srcset="logo.webp" type="image/webp">
          <source srcset="logo.png" type="image/png">
          <img src="logo.png" alt="eagle-logo" :style="style" />
      </picture>
  </div>
</template>

<script>
export default {
    name: 'EagleLogo',
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
.eagle-logo img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
</style>
