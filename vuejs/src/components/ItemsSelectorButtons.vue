<template>
  <div class="items-selector-buttons row justify-content-center no-gutters">
    <div class="col text-center">
      <eagle-button text="JSON" class="export-button" :disabled="disabled"/>
      <eagle-button text="CSV" class="export-button" :disabled="disabled"/>
    </div>
  </div>
</template>

<script>
import EagleButton from './EagleButton.vue';

export default {
    name: 'ItemsSelectorButtons',
    components: {
        EagleButton
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.export-button {
  margin: 24px 8px;
  display: inline-block;
}
</style>
