import { createStore } from "vuex"

const store = createStore({
   state:{
      name: "Vue",
      currency: 72,
      card: [],
   },
   mutations : {
      SET_CARD (state, product) {
         if (state.card.length) {
            let isExists = false;
            let outOfStock = false;
            state.card.map(function (item) {
               if (item.id == product.id && item.remains >=1) {
                  isExists = true;
                  item.quantity++;
                  item.remains--;
               } else if (item.id == product.id && item.remains <1){
                  outOfStock = true;
               }
            })
            if(!isExists && !outOfStock) {
               product.remains --;
               state.card.push(product)
            }
         } else {
            product.remains --;
            state.card.push(product)
         }
      },
      REMOVE_CARD (state, product) {
         state.card.map(function (item,index) {
            if (item.id == product.id) {
               state.card.splice(index,1)
            }
         })
      },
      SET_CURRENCY (state, value) {
         state.currency = value;
      }
   },
   actions : {
      insetToCard ({ commit }, value) {
         commit('SET_CARD', value)
      },
      removeFromCard ({ commit }, value) {
         commit('REMOVE_CARD', value)
      },
      updateCurrencyRate ({ commit }, value) {
         commit('SET_CURRENCY', value)
      }
   }
})

export default store
