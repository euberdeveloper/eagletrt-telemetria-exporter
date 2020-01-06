<template>
  <div id="app" class="d-flex align-items-center justify-content-center">
    <items-selector />
  </div>
</template>

<script>
import ItemsSelector from './components/items-selector/ItemsSelector.vue';

export default {
    name: 'app',
    components: {
        ItemsSelector
    }
};
</script>

<style lang="scss">
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: #8EBAF0;
}

body {
  background: #060606;
  color: #F4F4F4;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>

<style lang="scss">
#app {
  height: 100%;
}
</style>
