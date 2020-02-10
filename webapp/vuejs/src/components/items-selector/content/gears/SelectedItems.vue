<template>
  <div :class="selectedItems">
    <div v-for="db of databases" :key="db" class="db-container">
      <item type="DB" :text="db" selected />
      <div v-for="collection of selectedItems[db]" :key="collection">
          <item
            erased
            type="COLLECTION"
            :text="collection"
            @itemClicked="removeCollection(db, collection)" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from '../../../shared/item/Item.vue';

export default {
    name: 'SelectedItems',
    components: {
        Item
    },
    props: {
        selectedItems: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        databases: function () {
            return Object.keys(this.selectedItems || {});
        }
    },
    methods: {
        removeCollection (db, collection) {
            this.$store.dispatch('removeCollection', { db, collection });
        }
    }
};
</script>

<style lang="scss" scoped>
.db-container {
    margin: 0 0 12px 0;
}
</style>
