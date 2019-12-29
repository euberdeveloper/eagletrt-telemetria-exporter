<template>
  <div class="items-selector-content row justify-content-center">
    <div class="col">
      <database-items :databases="databases" :selected="currentDatabase" />
    </div>
    <div class="col">
      <collection-items :collections="collections" />
    </div>
    <div class="col">
      <selected-items :selectedItems="selectedItems" />
    </div>
  </div>
</template>

<script>
import CollectionItems from './CollectionItems.vue';
import DatabaseItems from './DatabaseItems.vue';
import SelectedItems from './SelectedItems.vue';

export default {
    name: 'ItemsSelectorContent',
    components: {
        DatabaseItems,
        CollectionItems,
        SelectedItems
    },
    props: {
        databases: {
            type: Array,
            default: () => []
        },
        currentDatabase: {
            type: Number,
            default: -1
        },
        collections: {
            type: Array,
            default: () => []
        },
        selectedItems: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped>
.items-selector-content {
  margin: 15px 0;
}
</style>
