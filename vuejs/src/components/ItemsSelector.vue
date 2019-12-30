<template>
  <div class="items-selector container">
    <items-selector-title />
    <items-selector-loading v-if="loading" :message="loadingMessage" />
    <items-selector-content
      v-if="!loading"
      :databases="databases"
      :currentDatabase="currentDatabase"
      :collections="currentCollections"
      :selectedItems="selectedItems"
    />
    <items-selector-buttons :disabled="loading" />
  </div>
</template>

<script>
import ItemsSelectorTitle from './ItemsSelectorTitle.vue';
import ItemsSelectorContent from './ItemsSelectorContent.vue';
import ItemsSelectorLoading from './ItemsSelectorLoading.vue';
import ItemsSelectorButtons from './ItemsSelectorButtons.vue';

export default {
    name: 'ItemsSelector',
    components: {
        ItemsSelectorButtons,
        ItemsSelectorContent,
        ItemsSelectorLoading,
        ItemsSelectorTitle
    },
    computed: {
        databaseSchema: function () {
            return this.$store.state.databaseSchema;
        },
        currentDatabase: function () {
            return this.$store.state.currentDatabase;
        },
        databases: function () {
            return this.$store.getters.databases;
        },
        currentCollections: function () {
            return this.$store.getters.currentCollections;
        },
        selectedItems: function () {
            return this.$store.state.selectedItems;
        },
        loading: function () {
            return this.$store.state.loading;
        },
        loadingMessage: function () {
            return this.$store.state.loadingMessage;
        }
    },
    created () {
        this.$store.dispatch('fetchDatabaseSchema');
    }
};
</script>

<style lang="scss" scoped>
.items-selector {
  background: #000000;
  padding: 24px;
  max-height: 95%;
  overflow-y: auto;
}
</style>
