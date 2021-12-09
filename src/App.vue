<template>
  <div class="container">
    <productsList />
    <card />
  </div>
</template>
<script>
  import productsList from './components/t-products'
  import card from './components/t-card'
  export default {
    name: 'App',
    components : {
      productsList,
      card
    },
    data(){
      return{
        currencyRate: this.$store.state.currency
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.setInterval(() => {
          this.updateCurrency();
        },5000);
      })
    },
    methods: {
      randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      },
      updateCurrency(){
        let newRate = this.randomNumber(20,80);
        this.$store.dispatch('updateCurrencyRate', newRate)
      }
    }

  }
</script>
<style>
  .container {
    max-width: 1080px;
    padding: 20px;
    margin: auto;
  }
</style>
