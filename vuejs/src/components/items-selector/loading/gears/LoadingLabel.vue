<template>
  <div class="loading-label">
    <h1>{{text}}{{dots}}{{spaces}}</h1>
  </div>
</template>

<script>
export default {
    name: 'LoadingLabel',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            dotsNumber: 3,
            interval: 1000
        };
    },
    computed: {
        dots: function () {
            return [...Array(this.dotsNumber).keys()]
                .map(_ => '.')
                .join('');
        },
        spaces: function () {
            return [...Array(3 - this.dotsNumber).keys()]
                .map(_ => ' ')
                .join('');
        }
    },
    methods: {
        updateDots () {
            this.dotsNumber = (this.dotsNumber + 1) % 4;
        }
    },
    mounted () {
        setInterval(() => this.updateDots(), this.interval);
    }
};
</script>

<style lang="scss" scoped>
.loading-label h1 {
    white-space: pre;
}
</style>
