<template>
	<div class="cart">
		<div class="cart-content" @click="show">
      <div class="cart-left">
        <div class="icon-wrapper">
          <div class="icon-cart" :class="{'hight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'hight':totalCount>0}"></i>
          </div>  
          <div :class="{'num':totalCount>0}">{{totalCount}}</div>
        </div>
        <div class="cart-price" :class="{'hight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="cart-desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="cart-right">
        <div class="cart-push" :class="style" >{{pay}}</div>
      </div>    
    </div>
    <div class="cart-view" v-show="flag">
      <div class="cart-main" ref="shows">
        <div>
          <div class="cart-title">
            <span class="cart-name">购物车</span>
            <span class="cart-close" @click="empty">清空</span>
          </div>
          <div class="cart-des">
            <ul>
              <li v-for="food in selectFoods" class="food-item">
                <span class="food-name">{{food.name}}</span>
                <span class="food-price">￥{{food.price*food.count}}</span>
                <span class="food-control"><cartcontrol :food="food"></cartcontrol></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-bg" v-show="flag" @click="show"></div>
	</div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
  export default {
    props:{
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      },
      selectFoods:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        flag:false
      }
    },
    methods:{
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count=0;
          this.flag=false
        })
      },
      show(){ 
        if(this.selectFoods.length>0){
            this.flag=!this.flag;
        }
        if(this.flag){
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll=new BScroll(this.$refs.shows,{
                click:true
              });
            }else{
              this.scroll.refresh();
            }
          });
        }
      }
    },
    components:{
      cartcontrol
    },
    computed:{
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+= food.price * food.count;
        });
        return total;
      },
      totalCount(){
        let count=0;
        this.selectFoods.forEach((food)=>{
          count+=food.count;
        });
        return count;
      },
      pay(){
        if(this.totalPrice ===0){
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice){
          let price=this.minPrice-this.totalPrice;
          return `还差￥${price}起送`;
        }else{
          return '去结算';
        }
      },
      style(){
        if(this.totalPrice >=this.minPrice){
          return 'enough';
        }else{
          return 'no-enough';
        }
      }
    }
  }
</script>

<style>
  .cart{
  
  }
  .cart-bg{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.6);
    z-index: 10;
    backdrop-filter: blur(10px);
  }
  .cart-content{
    position: fixed;
    bottom: 0px;
    font-size: 0;
    left:0px;
    width: 100%;
    height: 48px;
    z-index: 50;
    background: #141d24;
    display: flex;
  }
  .cart-content .cart-left{
    flex: 1;
    height: 48px;
  }
  .cart-content .cart-left .icon-wrapper{
     position: relative;
     display: inline-block;
     top:-10px;
     left: 0px;
     margin:0px 12px;
     padding: 6px;
     height: 56px;
     width: 56px;
     border-radius: 50%;
     box-sizing: border-box;
     background: #141d27;
     text-align: center;
  }
  .cart-content .cart-left .icon-wrapper .num{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 24px;
    border-radius: 12px;
    color: #fff;
    text-align: center;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
    line-height: 16px;
    font-weight: 700;
    font-size: 9px;
    background: rgb(240,20,20);
  }
  .cart-content .cart-left .icon-wrapper .icon-cart{
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background: #2b343c;
  }
  .cart-content .cart-left .icon-wrapper .hight{
    background: rgb(0,160,220);
  }
  .cart-content .cart-left .icon-wrapper .icon-shopping_cart{
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
  }
  .cart-content .cart-left .icon-wrapper .hight{
    color: #fff;
  }
  .cart-content .cart-left .cart-price{
    font-size: 16px;
    display: inline-block;
    margin-top: 12px;
    vertical-align: top;
    line-height: 24px;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
    box-sizing: border-box;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
  }
  .cart-content .cart-left .hight{
    color: #fff;
  }
  .cart-content .cart-left .cart-desc{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    line-height: 48px;
    padding: 0px 12px;
  }
  .cart-content .cart-right{
    flex: 0 0 105px;
    background: #2B333B;
    text-align: center;
  }
  .cart-content .cart-right .cart-push{
    font-size: 14px;
    font-weight: 700;
    padding: 0px 8px;
    color: #979A9C;
    line-height: 50px;
  }
  .cart-content .cart-right .enough{
    background: #00b43c;
    color: #fff;
  }
  .cart-content .cart-right .no-enough{
    background: #2b333b;
  }
  .cart-view{
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 40;
  }
  .cart-view .cart-main{
    width: 100%;
    max-height: 305px;
    overflow: hidden;
    background: #fff;
  }
  .cart-title{
    height: 40px;
    width: 100%;
    background: #f3f5f7;
    position: relative;
  }
  .cart-title:after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 1px;
    width: 100%;
    transform: translateY(0.5);
    -webkit-transform: translateY(0.5);
    background: rgba(7,17,27,0.1);
  }
  .cart-title .cart-name{
    font-size: 14px;
    font-weight: 200;
    line-height: 40px;
    float: left;
    padding-left: 18px;
    color: rgb(7,17,27);
  }
  .cart-title .cart-close{
    float:right;
    font-size: 12px;
    line-height: 40px;
    padding-right: 18px;
    color: rgb(0,160,220);
  }
  .cart-view .cart-main .cart-des{
    padding:0px 16px;
  }
  .cart-view .cart-main .cart-des .food-item{
    position: relative;
    height: 48px;
    line-height: 48px;
    display: flex;
  }
  .cart-view .cart-main .cart-des .food-item:after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 1px;
    width: 100%;
    transform: translateY(0.5);
    -webkit-transform: translateY(0.5);
    background: rgba(7,17,27,0.1);
  }
  .cart-view .cart-main .cart-des .food-item .food-name{
    font-size: 14px;
    flex: 1;
    line-height: 48px;
    color: rgb(7,17,27);
  }
  .cart-view .cart-main .cart-des .food-item .food-price{
    font-size: 14px;
    line-height: 48px;
    vertical-align: top;
    padding:0px 12px 0px 18px;
    font-weight: 700;
    color: rgb(240,20,20);
  }
  .cart-view .cart-main .cart-des .food-item .food-control{
    margin-top: 9px;
    line-height: 48px;
    height: 48px;
  }
</style>
