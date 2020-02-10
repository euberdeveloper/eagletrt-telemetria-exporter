<template>
  <div class="items-selector-refresh-buttons col text-center">
    <eagle-button text="RETRY" :disabled="disabled" @eagleClick="refresh()"/>
  </div>
</template>

<script>
import EagleButton from '../../../shared/eagle/EagleButton.vue';

export default {
    name: 'ItemsSelectorRefreshButtons',
    components: {
        EagleButton
    },
    data: function () {
        return {
            disabled: false
        };
    },
    methods: {
        refresh () {
            this.disabled = true;
            this.$store.dispatch('fetchDatabaseSchema');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
