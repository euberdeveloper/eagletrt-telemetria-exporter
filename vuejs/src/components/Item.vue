<template>
  <div :class="itemClass">
    <span @click="itemClicked()">{{text}}</span>
  </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        text: {
            type: String,
            required: true
        },
        type: {
            validator: function (value) {
                return ['DB', 'COLLECTION'].includes(value);
            },
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        },
        erased: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        itemClass: function () {
            return {
                item: true,
                selected: this.selected,
                erased: this.erased,
                database: this.type === 'DB',
                collection: this.type === 'COLLECTION'
            };
        }
    },
    methods: {
        itemClicked () {
            this.$emit('itemClicked');
        }
    }
};
</script>

<style lang="scss" scoped>
.database {
  color: #757575;
  font-size: 24px;
}
.collection {
  color: #bcbcbc;
  font-size: 22px;
}
.item {
  text-align: center;
}
.item span {
  cursor: pointer;
}
.item span:hover {
  color: #f4f4f4;
}
.selected {
  text-align: center;
  color: #ffec00;
}
.selected span:hover {
  color: #ffec00;
}
.erased span:hover {
  color: #ee9999;
}
</style>
