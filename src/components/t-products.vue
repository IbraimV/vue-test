<template>
    <div class="products-grid">
        <div class="products-grid-list" v-for="(p, index) in products" :key="index">
            <div class="products-grid-list-title">
                {{index}}
            </div>
            <products v-for="(productData,index) in p" v-bind:productData="productData" :key="index"></products>
        </div>
    </div>
</template>

<script>
    import data from '../data/data.json'
    import names from '../data/names.json'
    import products from  './t-products-item'
    export default {
        name: "t-products",
        components: {
            products
        },
        data() {
            return {
                products: {},
            }
        },
        created() {
            this.prodList()
        },
        methods: {
            prodList() {
                let products = {};
                data.Value.Goods.forEach(((el) => {
                    for (let i in names) {
                        if (i == el.G) {
                            if(products[names[i]['G']] == undefined) {
                                products[names[i]['G']] = [];
                                products[names[i]['G']].push({'id':el.T,'title':names[i]['B'][el.T].N, 'price':el.C, 'remains': el.P, 'quantity':'1', 'nostock': false});
                            } else {
                                products[names[i]['G']].push({'id':el.T,'title':names[i]['B'][el.T].N, 'price':el.C, 'remains': el.P, 'quantity':'1', 'nostock': false});
                            }
                        }
                    }
                }));
                return this.products = products;
            }
        }
    }
</script>

<style lang="scss">
    .products-grid {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 15px;
        &-list {
            border: 1px solid grey;
            border-radius: 5px;
            overflow: hidden;
            &-title {
                background: grey;
                padding: 5px 10px;
                color: white;
            }
        }
    }
</style>
