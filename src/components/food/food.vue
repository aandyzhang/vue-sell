<template>
	<div class="food" v-show="showFlag" ref="fooded">
		<div>
			<div class="food-header">
			<img :src="food.image" alt="">
			<div class="back" @click="hidden">
				<i class="icon-arrow_lift"></i>
			</div>
		</div>
		<div class="food-content">
			<h2 class="food-title">{{food.name}}</h2>
			<div class="sell">
				<span class="sell-number">月售{{food.sellCount}}份</span>
				<span class="sell-rating">好评率{{food.rating}}%</span>
			</div>
			<div class="prices">
				<span class="news">￥{{food.price}}</span>
				<span class="olds" v-show="food.oldPrice>0">￥{{food.oldPrice}}</span>
			</div>
			<div class="cart-wapper">
				<div class="buy" @click="addCart" v-show="!food.count">加入购物车</div>
				<cartcontrol :food="food" v-show="food.count>0"></cartcontrol>	
			</div>
		</div>
		<div class="bgLine"></div>
		<div class="descriptions">
			<h2 class="des-title">商品介绍</h2>
			<p class="des-content">{{food.info}}</p>
		</div>
		<div class="bgLine"></div>
		<div class="descriptions">
			<h2 class="des-title">商品评价</h2>
			<div class="ratings">
				<span class="all">全部<i>{{food.rating}}</i></span>
				<span class="better">推荐<i>{{food.ratings.length}}</i></span>
				<span class="bad">吐槽<i>{{bad}}</i></span>		
			</div>
		</div>
		<div class="check">
			<p><i class="icon-check_circle"></i>只看有内容的评价</p>
		</div>
		<div class="Tline"></div>
		<div class="ratingContent" v-for="rating in food.ratings">
			<div class="rating-top">
				<div class="time">{{getTime(rating.rateTime)}}</div>
				<div class="user">
					<span class="sno">{{rating.username}}</span>
					<img class="avatar" :src="rating.avatar" alt="" height="12" width="12">
				</div>
			</div>
			<div class="rating-content">
				<p>{{rating.text}}</p>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			},
		},
		data(){
			return {
				showFlag:false,
				better:0,
			}
		},
		computed:{
			bad(){
				var num=0;
				for(var i=0; i< this.food.ratings.length;i++){
					if(this.food.ratings[i].rateType == 1){
						num++;
					}
				}
				return num;
			},
		},
		methods:{
			show(){
				console.log(this.food);
				this.showFlag=true;
				//向下拽采用ref注意dom使用时，要用在外层上
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.fooded,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			},
			getTime(time){
				var date=new Date(time);
				let Y=date.getFullYear();
				let m=date.getMonth()+1;
				let d=date.getDate();
				let H=date.getHours();
				let i=date.getMinutes();
				let s=date.getSeconds();
				m=m<10?'0'+m :m;
				d=d<10?'0'+d :d;
				H=H<10?'0'+H :H;
				i=i<10?'0'+i :i;
				s=s<10?'0'+s :s;
				return Y+'-'+m+'-'+d+'\n'+H+':'+i;
			},
			hidden(){
				this.showFlag=false;
			},
			addCart(event){
				if(!event._constructed){
 					return;
 				}
 				//设置count的初始值
 				Vue.set(this.food,'count',1);
			}
		},
		components:{  //注册组件
			cartcontrol
		}
	};
</script>
<style>
	.food{
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
	}
	.back{
		position: fixed;
		top: 10px;
		left: 0px;
	}
	.back .icon-arrow_lift{
		display: block;
		padding:10px;
		font-size: 20px;
		color: #fff;
	}
	.food-content{
		position: relative;
		width: 100%;
	}
	.food-header{
		position: relative;
		width: 100%;
		height: 0px;
		padding-top: 100%;
	}
	.food-header img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.food-content{
		margin:18px;
		width: 100%;
	}
	.food-title{
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
		line-height: 14px;
		margin-bottom: 8px;
	}
	.sell{
		font-size: 10px;
		line-height: 10px;
		padding-bottom: 18px;
		color: rgb(147,153,159);
	}
	.sell .sell-number{
		margin-right: 12px;
	}
	.prices{
		margin-bottom: 18px;
	}
	.prices .news{
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
		line-height: 24px;
	}
	.prices .olds{
		font-size: 10px;
		font-weight: 700;
		color: rgb(147,153,159);
		line-height: 24px;
	}
	.bgLine{
		height: 16px;
		background: #f3f5f7;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.cart-wapper{
		position: absolute;
		bottom: 0px;
		right: 30px;
	}
	.buy{
		font-size: 10px;
		color: #fff;
		background: rgb(0,160,220);
		border-radius: 12px;
		height: 24px;
		width: 74px;
		text-align: center;
		line-height: 24px;
	}
	.descriptions{
		margin:18px;
	}
	.des-title{
		font-size: 14px;
		padding-bottom: 6px;
		font-weight: 700;
	}
	.des-content{
		font-size: 12px;
		font-weight: 200;
		color: rgb(77,85,93);
		line-height: 24px;
		padding:0px 8px;
	}
	.ratings{
		margin-top: 12px;
		margin-bottom: 18px;
	}
	.ratings span{
		font-size: 0px;
		padding:8px 12px;
		border-radius: 12px;
		line-height: 16px;
		display: inline-block;
	}
	.ratings span i{
		font-style: normal;
		font-size: 8px;
		margin-left: 5px;
	}
	.ratings span.all{
		font-size: 12px;
		background: rgb(0,160,220);
		color: #fff;
	}
	.ratings span.better{
		font-size: 12px;
		background: rgba(0,160,220,0.2);
		color:rgb(77,85,93);
	}
	.ratings span.bad{
		font-size: 12px;
		background: rgba(77,85,93,0.2);
		color:#888;
	}
	.ratings:after{
		content: '';
		height: 1px;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
		display: block;
		width: 100%;
		margin-top: 18px;
		background: rgba(7,17,27,0.1);
	}
	.check{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 24px;
		margin: 12px 16px;
	}
	.check i{
		font-size: 24px;
		color: rgb(147,153,159);
		line-height: 24px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.Tline{
		height: 1px;
		width: 100%;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
		background:rgba(7,17,27,0.1);
	}
	.ratingContent{
		margin:16px 12px 0px 16px;
	}
	.time{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
		float: left;
	}
	.user{
		float: right;
	}
	.user .sno{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
	}
	.user .avatar{
		border-radius: 100%;
		vertical-align: bottom;
		margin-left: 6px;
	}
	.rating-content{
		clear: both;
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 20px;
		margin:6px 0px 16px 4px;
	}
	.ratingContent:after{
		content: '';
		height: 1px;
		display: block;
		background:rgba(7,17,27,0.1);
		width: 100%;
		-webkit-transform: scaleY(0.5);
		background:rgba(7,17,27,0.1);
	}
</style>