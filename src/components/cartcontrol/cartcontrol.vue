<template>
	<div class="cartcontrol">
    <div class="decrease-wrapper" v-show="food.count>0" @click="decreaseCart($event)">
      <i class="icon-remove_circle_outline"></i>
    </div>
    <div class="cart-text" v-show="food.count>0">{{food.count}}</div>
    <div class="add-wrapper" @click="addCart($event)">
        <i class="icon-add_circle"></i>
    </div>
	</div>
</template>

<script>
import Vue from 'vue';
  export default {
    props:{
      food:{
        type:Object,
      }
    },
    methods:{
      addCart(event){
        if(!event._constructed){
           return;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count++;
        }
      },
      decreaseCart(event){
         if(!event._constructed){
          return;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count--;
        }
      },
    }
  }
</script>

<style>
  .cartcontrol{
    font-size: 0;
    color: rgb(0,160,222);
  }
  .add-wrapper{
    font-size: 24px;
    padding: 6px;
    line-height: 24px;
    display: inline-block;
  }
  .cart-text{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 24px;
    width: 12px;
    padding-top: 6px;
    text-align: center;
  }
  .decrease-wrapper{
    font-size: 24px;
    padding: 6px;
    line-height: 24px;
    display: inline-block;
  }
</style>
