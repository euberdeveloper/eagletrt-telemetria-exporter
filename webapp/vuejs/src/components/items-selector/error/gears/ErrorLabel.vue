<template>
  <div class="error-label">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
    name: 'ErrorLabel',
    props: {
        text: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.error-label h1 {
  color: red;
}
</style>
