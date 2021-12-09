<template>
    <div class="card">
        <div class="card-header">
            <div>Название</div>
            <div>Колличество</div>
            <div>Цена</div>
            <div></div>
        </div>
        <div class="card-item" v-for="(c,index) in card" :key="index">
            <div>{{c.title}}</div>
            <div>
                {{rubPrice(c.price)}}
            </div>
            <div>
                {{c.quantity}}
                <span class="card-notification" v-if="c.remains < 5 ">Количество товара ограничено. На складе осталось {{c.remains}} шт.</span>
            </div>
            <div>
                <button v-on:click="removeFromCard(c)">Удалить</button>
            </div>
        </div>
        <div class="card-totals">
            <p>{{totalSum(index)}} рублей</p>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "t-card",
        data(){

        },
        computed: mapState(["card","currency"]),
        methods: {
            rubPrice(price) {
                let ruPrice = price * this.currency;
                return ruPrice.toFixed(2);
            },
            totalSum() {
                let sum = 0;
                this.card.forEach(item => {
                    sum = sum + (item.price * item.quantity);
                })
                sum = sum * this.currency;
                return sum.toFixed(2);
            },
            removeFromCard(object) {
                this.$store.dispatch('removeFromCard', object)
            }
        }

    }
</script>

<style lang="scss">
    .card {
        margin-top: 50px;
        &-header {
            display: grid;
            grid-template-columns: 3fr 1fr 1fr 1fr;
            margin-bottom: 20px;
            opacity: 0.6;
         }
        &-item {
            margin-top: 15px;
            display: grid;
            grid-template-columns: 3fr 1fr 1fr 1fr;
            padding-bottom: 10px;
            border-bottom: 1px solid grey;
        }
        &-totals {
            color: red;
            text-align: right;
            margin-top: 30px;
            font-size: 24px;
        }
        &-notification {
            display: block;
            padding: 3px;
            font-size: 10px;
            border: 1px solid red;
            color: red;
            max-width: 80%;
            margin-top: 5px;
        }
    }
</style>
