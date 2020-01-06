<template>
  <div class="items-selector-buttons row justify-content-center no-gutters">
    <items-selector-editing-buttons v-if="type === 'EDITING'" :disabled="disabled"/>
    <items-selector-refresh-buttons v-if="type === 'REFRESH'" :disabled="disabled"/>
    <items-selector-exporting-error-buttons v-if="type === 'EXPORTING_ERROR'" :disabled="disabled"/>
  </div>
</template>

<script>
import ItemsSelectorEditingButtons from './gears/ItemsSelectorEditingButtons.vue';
import ItemsSelectorRefreshButtons from './gears/ItemsSelectorRefreshButtons.vue';
import ItemsSelectorExportingErrorButtons from './gears/ItemsSelectorExportingErrorButtons.vue';

export default {
    name: 'ItemsSelectorButtons',
    components: {
        ItemsSelectorEditingButtons,
        ItemsSelectorRefreshButtons,
        ItemsSelectorExportingErrorButtons
    },
    props: {
        type: {
            validator: function (value) {
                return ['EDITING', 'REFRESH', 'EXPORTING_ERROR'].includes(value);
            },
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
