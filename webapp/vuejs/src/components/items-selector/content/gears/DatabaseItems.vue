<template>
  <div class="databaseItems">
    <item
        v-for="(db, index) of databases"
        :key="db"
        type="DB"
        :text="db"
        :selected="index === selected"
        @itemClicked="selectDatabase(index)" />
  </div>
</template>

<script>
import Item from '../../../shared/item/Item.vue';

export default {
    name: 'DatabaseItems',
    components: {
        Item
    },
    props: {
        databases: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Number,
            default: -1
        }
    },
    methods: {
        selectDatabase (index) {
            this.$store.dispatch('selectDatabase', index);
        }
    }
};
</script>
