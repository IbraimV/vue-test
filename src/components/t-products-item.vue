<template>
    <div class="product-item">
        <p>{{productData.id}}-{{productData.title}} ({{productData.remains}})
        </p>
        <div class="product-price" v-bind:class="rateClass">
            {{rubPrice(productData.price)}}
        </div>
        <button v-on:click="addToCard(productData)">
            В корзину
        </button>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "t-products-item",
        props: {
            productData: Object,
        },
        data(){
            return{
                rateClass: ''
            }
        },
        computed: {
            ...mapState(["currency"]),
        },
        methods: {
            rubPrice(price) {
                let ruPrice = price * this.currency;
                return ruPrice.toFixed(2);
            },
            addToCard(object) {
                this.$store.dispatch('insetToCard', object)
            }
        },
        watch: {
            currency: function (newValue,oldValue) {
                if(newValue > oldValue) {
                    this.rateClass = 'red';
                } else if (newValue < oldValue) {
                    this.rateClass = 'green';
                } else {
                    this.rateClass = '';
                }
            }
        },
    }
</script>

<style lang="scss">
    .product-item {
        text-align: left;
        display: grid;
        grid-template-columns: 5fr 1fr 1.5fr;
        align-items: center;
        padding-left: 15px;
        padding-right: 5px;
        & .product-price {
            text-align: center;
            &.red {
                color: red;
            }
            &.green {
                color: green;
            }
          }
    }
</style>
