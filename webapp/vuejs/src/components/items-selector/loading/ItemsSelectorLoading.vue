<template>
  <div class="items-selector-loading row justify-content-center">
    <div class="col text-center">
      <eagle-spinner class="d-inline-block" />
      <loading-label class="d-inline-block" :text="message" />
    </div>
  </div>
</template>

<script>
import EagleSpinner from '../../shared/eagle/EagleSpinner.vue';
import LoadingLabel from './gears/LoadingLabel.vue';

export default {
    name: 'ItemsSelectorLoading',
    components: {
        EagleSpinner,
        LoadingLabel
    },
    props: {
        message: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.items-selector-loading {
  margin: 50px 0;
}

.loading-label {
  margin-left: 50px;
}
</style>
