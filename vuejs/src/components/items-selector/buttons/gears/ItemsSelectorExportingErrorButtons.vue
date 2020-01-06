<template>
  <div class="items-selector-exporting-error-buttons col text-center">
    <eagle-button text="UNDERSTOOD" :disabled="disabled" @eagleClick="understood()"/>
  </div>
</template>

<script>
import EagleButton from '../../../shared/eagle/EagleButton.vue';

export default {
    name: 'ItemsSelectorExportingErrorButtons',
    components: {
        EagleButton
    },
    data: function () {
        return {
            disabled: false
        };
    },
    methods: {
        understood () {
            this.disabled = true;
            this.$store.dispatch('backToEditing');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
