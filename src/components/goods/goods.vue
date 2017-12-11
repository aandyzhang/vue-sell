<template>
  <div class="good">
	<div class="goods-left" ref="menu">
		<ul class="goods">
			<li v-for="(item,index) in goods" class="goods-item border-line" :class="{'current':currentIndex===index}" @click="goto(index,$event)">
				<span class="text">{{item.name}}</span>
			</li>
		</ul>
	</div>
	<div class="goods-center" ref="food">
		<ul>
			<li v-for="(item,index) in goods" class="scroll">
				<h1 class="goods-name">{{item.name}}</h1>
				<ul ref="ulname">
					<li v-for="food in item.foods" class="food-item food-line" @click="selectFood(food,$event)">
						<div class="icon">
							<img width="57" height="57" :src="food.icon" alt="">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="des">{{food.description}}
							</p>
							<div class="sell">
								<span>月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
							</div>
							<div class="price
							">
								<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="cart-wapper">
								<cartcontrol :food="food"></cartcontrol>	
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
		<cart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>	
	<food :food="selectedFood" ref="foods"></food>
  </div>
</template>

<script>
  let ERR_OK=0;
  import BScroll from 'better-scroll';
  import cart from 'components/cart/cart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
 	export default{
 		data(){
 			return {
 				goods:[],
 				heightList:[],
 				scrollY:0,
 				selectedFood:{},
 				
 			}
 		},
 		props:{
 			seller:{
 				type:Object,
 				default:{}
 			}
 		},
 		components:{
 			cart,
 			cartcontrol,
 			food
 		},
 		computed:{
 			currentIndex(){
 				for(let i=0;i<this.heightList.length;i++){
 					let height1=this.heightList[i];
 					let height2=this.heightList[i+1];
 					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
 						return i;
 					}
 				}
 				return 0;
 			},
 			selectFoods(){
 				let foods=[];
 				this.goods.forEach((good)=>{
 					good.foods.forEach((food)=>{
 						if(food.count){
 							foods.push(food);
 						}
 					});
 				});
 				return foods;
 			}
 		},
 		methods:{
 			selectFood(food,event){
 				if(!event._constructed){
 					return;
 				}
 				this.selectedFood=food;
 				this.$refs.foods.show();
 			},
 			goto(index,event){
 				if(!event._constructed){
 					return;
 				}
 				let foodList=this.$refs.food.getElementsByClassName('scroll');
 				let el=foodList[index];
 				this.foodScroll.scrollToElement(el,300);
 			},
 			 _initScroll(){
 			 	this.menuScroll=new BScroll(this.$refs.menu,{
 			 		click:true
 			 	});
 			 	this.foodScroll=new BScroll(this.$refs.food,{
 			 		probeType:3,
 			 		click:true
 			 	});
 			 	this.foodScroll.on('scroll',(pos)=>{
 			 		this.scrollY=Math.abs(Math.round(pos.y));
 			 	})
 			 },
 			 _calHiegth(){
 			 	let foodList=this.$refs.food.getElementsByClassName('scroll');
 			 	let height=0;
 			 	this.heightList.push(height);
 			 	for(let i=0;i<foodList.length;i++){
 			 		let item=foodList[i];
 			 		height+=item.clientHeight;
 			 		this.heightList.push(height);
 			 	}
 			 }
 		},
 		created(){
 			this.$http.get('/api/goods').then((res)=>{
 				res=res.data;
 				if(res.errno === ERR_OK){
 					this.goods=res.data;
 					this.$nextTick(()=>{
 							this._initScroll();
 							this._calHiegth();
 					})
 				}
 			},(err)=>{
 				console.log(err);
 			})
 		},
 	}
</script>

<style>
	.good{
		position: absolute;
		display: flex;
		overflow: hidden;
		width: 100%;
		top: 174px;
		bottom:46px;
	}
	.good .goods-left{
		flex: 0 0 80px;
		width: 80px;
		background:#f3f5f7;
	}
	.good .goods-left.current{
		background:rgb(240,20,20);
	}
	.good .goods-left .goods{
		font-size: 12px;		
		font-weight: 200;		
	}
	.good .goods-left .goods .goods-item{
		display: table;
		width: 80px;
		height: 54px;
		line-height: 14px;
	}
	.good .goods-left .goods .current{
		background:#fff;
	}
	.good .goods-left .goods .goods-item.border-line{
		position: relative;
	}
	.good .goods-left .goods .goods-item.border-line:after{
		content: '';
		position: absolute;
		bottom: 0px;
		left: 5px;
		height: 1px;
		width: 80%;
		background: rgba(7,17,27,0.1);
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	.good .goods-left .goods .goods-item .text{
		display: table-cell;
		line-height: 14px;
		vertical-align: middle;
		width: 56px;
		padding: 0 12px;
		font-size: 12px;
	}
	.good .goods-center{
		flex: 1;
	}
	.goods-center .goods-name{
		height: 26px;
		font-size: 12px;
		padding-left: 14px;
		color: rgb(147,153,159);
		line-height: 26px;
		background: #f3f5f7;
		border-left:2px solid #d9dde1;
	}
	.goods-center .icon{
		display: inline-block;
		vertical-align: top;
	}
	.goods-center .icon img{
		border-radius: 4px;
	}
	.goods-center .food-item{
		display: flex;
		margin: 18px;
		font-size: 0;
		padding-bottom: 18px;
	}
	.goods-center .food-item.food-line{
		position: relative;
	}
	.goods-center .food-item.food-line:after{
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0px;
		height: 1px;
		width: 100%;
		background: rgba(7,17,27,0.1);
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	.goods-center .content{
		font-size: 0px;
		padding-left:10px;
	}
	.goods-center .content .name{
		font-size: 14px;
		vertical-align: top;
		color: rgb(7,17,27);
		line-height: 14px;
		margin-bottom: 8px;
	}
	.goods-center .content .des{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
		margin-bottom: 8px;
	}
	.goods-center .content .sell{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		margin-bottom: 8px;
	}
	.goods-center .content .sell .rating{
		margin-left: 12px;
	}
	.goods-center .content .price{
		font-size: 14px;
		line-height: 24px;
	}
	.goods-center .content .cart-wapper{
		position: absolute;
		bottom:6px;
		right: 0px;
	}
	.goods-center .content .price .now{
		color: rgb(240,20,20);
		font-weight: 700;
		margin-right: 8px;
	}
	.goods-center .content .price .old{
		color: rgb(147,153,159);
		text-decoration: line-through;
		font-size: 10px;
		font-weight:normal;
	}
</style>
