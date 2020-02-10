<template>
  <div class="items-selector-editing-buttons col text-center">
    <eagle-button text="JSON" class="export-button" :disabled="disabled" @eagleClick="exportJson()"/>
    <eagle-button text="CSV" class="export-button" :disabled="disabled" @eagleClick="exportCsv()"/>
  </div>
</template>

<script>
import EagleButton from '@/components/shared/eagle/EagleButton.vue';

export default {
    name: 'ItemsSelectorEditingButtons',
    components: {
        EagleButton
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        exportJson () {
            this.$store.dispatch('exportJson');
        },
        exportCsv () {
            this.$store.dispatch('exportCsv');
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
