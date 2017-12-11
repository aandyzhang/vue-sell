<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header';
  const ERR_OK = 0;
  export default {
    components:{
      'v-header':header
    },
    data(){
      return {
        seller:{},
      }
    },
    created(){
      this.$http.get('/api/seller').then((req)=>{
        req=req.data;
        if(req.errno ===ERR_OK){
          this.seller=req.data;
        }
      },(err)=>{
        console.log(err);
      })
     }
  }
</script>

<style>
  #app .tab{
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  #app .tab:after{
    content: '';
    width:100%;
    height: 1px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: rgba(7,17,27,0.1);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  #app .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  #app .tab .tab-item a{
    font-size: 14px;
    display: block;
    color: rgb(77,85,93);
  }
  #app .tab .tab-item .active{
    color: rgb(240,20,20);
  }
</style>
