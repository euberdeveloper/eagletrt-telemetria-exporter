<template>
  <div class="items-selector-title row justify-content-center">
    <div class="col">
      <h1 class="title">{{ text }}</h1>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ItemsSelectorTitle',
    props: {
        text: {
            type: String,
            default: 'Telemetria'
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 24px;
}
</style>
