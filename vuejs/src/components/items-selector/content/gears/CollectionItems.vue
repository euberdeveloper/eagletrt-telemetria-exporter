<template>
  <div class="collectionItems">
    <item
        v-for="({label, selected}) of collections"
        :key="label"
        type="COLLECTION"
        :text="label"
        :selected="selected"
        @itemClicked="toggleCollection(label, selected)" />
  </div>
</template>

<script>
import Item from '../../../shared/item/Item.vue';

export default {
    name: 'CollectionItems',
    components: {
        Item
    },
    props: {
        collections: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        database: function () {
            return this.$store.getters.currentDatabaseName;
        }
    },
    methods: {
        toggleCollection (label, selected) {
            const collection = { db: this.database, collection: label };
            if (selected) {
                this.$store.dispatch('removeCollection', collection);
            } else {
                this.$store.dispatch('addCollection', collection);
            }
        }
    }
};
</script>
