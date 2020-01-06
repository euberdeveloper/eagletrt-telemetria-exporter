<template>
  <div class="items-selector-error row justify-content-center">
    <div class="col text-center">
      <eagle-logo class="d-inline-block" />
      <error-label class="d-inline-block" :text="message" />
    </div>
  </div>
</template>

<script>
import EagleLogo from '../../shared/eagle/EagleLogo.vue';
import ErrorLabel from './gears/ErrorLabel.vue';

export default {
    name: 'ItemsSelectorError',
    components: {
        EagleLogo,
        ErrorLabel
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
.items-selector-error {
  margin: 50px 0;
}

.error-label {
  margin-left: 50px;
}
</style>
